import './index.css';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupDeleteConfirm from '../scripts/components/PopupDeleteConfirm.js';

import Api from '../scripts/components/Api.js';

import { formValidationConfig, 
  popupProfileOpenButton, 
  popupAddPlaceOpenButton,
  popupEditAvatarButton,
  formEditProfile,
  formCreateCard,
  formEditAvatar,
  cardTemplateSelector,
  cardsListSelector,
  popupEditAvatarSelector,
  popupEditProfileSelector,
  popupAddPlaceSelector,
  popupImageSelector,
  popupDeleteConfirmSelector
} from '../scripts/utils/constants.js';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
    'Content-Type': 'application/json'
  }
});

// создать карточку
const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    cardTemplateSelector, 
    handleCardClick,
    openPopupDeleteConfirm,
    handleLikeButton
  );

  return card.generateCard();
}


// открыть картинку при нажатии на карточку
const handleCardClick = (link, title) => {
  popupImage.open(link, title);
}
// открыть попап удаления карточки
const openPopupDeleteConfirm = (card, cardId) => {
  popupDeleteConfirmComponent.setCard(card, cardId);
  popupDeleteConfirmComponent.open();
}

// поставить и удалить лайк
const handleLikeButton = (cardId, cardLikes, userId, likeCounter, setCardLikes) => {
  if (cardLikes.some((userInfo) => userInfo._id === userId)) {
    api.deleteLike(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        setCardLikes(card.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api.putLike(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        setCardLikes(card.likes);
      })
      .catch((err) => console.log(err));
  }
}

// отрисовать карточку
const renderCard = (data) => {
  cardSection.addItem(createCard(data));
}

// создать массив карточек
const cardSection = new Section((data) => renderCard(data), cardsListSelector);

// информация о пользователе
const userInfo = new UserInfo({
  selectorProfileName: '.profile__title', 
  selectorProfileAbout: '.profile__subtitle',
  selectorAvatar: '.profile__avatar'
});

// открыть попап по клику на кнопку "Редактировать"
const handlePopupProfileOpenButton = () => {
  
  // При открытии формы поля "Имя" и "О себе" заполнены теми значениями, которые отображаются на странице
  popupEditProfile.setInputValues(userInfo.getUserInfo());

  // удалить ошибки
  formValidatorProfile.resetValidateForm();
  popupEditProfile.open();
};

// открыть попап по клику на кнопку "Добавить"
const handlePopupAddPlaceOpenButton = () => {
  // удалить ошибки
  formValidatorCard.resetValidateForm();
  popupAddPlace.open();
};

// открыть попап по клику на аватар
const handlePopupEditAvatarButton = () => {
  // удалить ошибки
  formValidatorAvatar.resetValidateForm();
  popupEditAvatar.open();
}

const handleFormEditAvatar = (data) => {
  popupEditAvatar.renderLoading(true, 'Сохранение...');
  api.editUserAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditAvatar.renderLoading(false));
}

// Специальное событие submit отправляет форму попапа "Редактировать"
const handleFormEditProfile = (data) => {
  popupEditProfile.renderLoading(true, 'Сохранение...');
  api.editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditProfile.renderLoading(false));
};

// Специальное событие submit отправляет форму попапа "Добавить"
const handleFormCreateCard = (data) => {
  popupAddPlace.renderLoading(true, 'Создание...');
  api.addNewCard(data)
    .then((data) => {
      renderCard(data);
      popupAddPlace.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddPlace.renderLoading(false))
};

const handlePopupDeleteConfirm = (card, cardId) => {
  popupDeleteConfirmComponent.renderLoading(true, 'Удаление...');
  api.deleteCards(cardId)
    .then(() => {
    // card.deleteCard(data._id);
    card.remove();
    popupDeleteConfirmComponent.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupDeleteConfirmComponent.renderLoading(false))
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo(data);
    userId = data._id;
    cardSection.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));


// создаем для каждого попапа свой экземпляр класса PopupWithForm

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popupEditAvatar = new PopupWithForm (popupEditAvatarSelector, handleFormEditAvatar);
popupEditAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm (popupEditProfileSelector, handleFormEditProfile);
popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm (popupAddPlaceSelector, handleFormCreateCard);
popupAddPlace.setEventListeners();

const popupDeleteConfirmComponent = new PopupDeleteConfirm (popupDeleteConfirmSelector, handlePopupDeleteConfirm);
popupDeleteConfirmComponent.setEventListeners();


popupProfileOpenButton.addEventListener('click', handlePopupProfileOpenButton); // слущатель кнопки "Редактировать"
popupAddPlaceOpenButton.addEventListener('click', handlePopupAddPlaceOpenButton); // слушатель кнопки "Добавить"
popupEditAvatarButton.addEventListener('click', handlePopupEditAvatarButton); // слушатель кнопки "Редактировать аватар"

// включаем валидацию каждой формы
const formValidatorProfile = new FormValidator(formValidationConfig, formEditProfile);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(formValidationConfig, formCreateCard);
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(formValidationConfig, formEditAvatar);
formValidatorAvatar.enableValidation();