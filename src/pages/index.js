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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
    'Content-Type': 'application/json'
  }
});

let userId;

// создать карточку
const createCard = (data) => {
  return new Card(
    data, 
    userId,
    cardTemplateSelector, 
    handleCardClick,
    like,
    dislike,
    handleDeleteCard
    ).generateCard();
}

// открыть картинку при нажатии на карточку
const handleCardClick = (link, title) => {
  popupImage.open(link, title);
}

const handleDeleteCard = (cardId, card) => {
  popupDeleteConfirm.setCard(cardId, card);
  popupDeleteConfirm.open();
}

// перепродумать метод
const like = (item, card) => {
  api.putLike(item._id)
    .then((res) => {
      card.setLike(res);
      card.classList.add("card__like_active");
    })
    .catch((err) => console.log(err));
}

const dislike = (item, card) => {
  api.deleteLike(item._id)
    .then((res) => {
      card.setLike(res);
      card.classList.remove("card__like_active");
    })
    .catch((err) => console.log(err));
}

// отрисовать карточку
const renderCard = (data) => {
  cardSection.addItem(createCard(data));
}


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

// создать массив карточек
const cardSection = new Section((data) => renderCard(data), cardsListSelector);

// информация о пользователе
const userInfo = new UserInfo({
  selectorProfileName: '.profile__title', 
  selectorProfileAbout: '.profile__subtitle',
  selectorAvatar: '.profile__avatar'
});

const handleFormEditAvatar = (data) => {
  popupEditAvatar.renderLoading(true, 'Сохранение...');
  api.editUserAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
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
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditProfile.renderLoading(false));
};

// Специальное событие submit отправляет форму попапа "Добавить"
const handleFormCreateCard = ({place: name, link}) => {
  popupAddPlace.renderLoading(true, 'Создание...');
  api.addNewCard({name, link})
    .then(({name, link}) => {
      renderCard({name, link});
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddPlace.renderLoading(false))
};

const handlePopupDeleteConfirm = (cardId, card) => {
  popupDeleteConfirm.renderLoading(true, 'Удаление...');
  api.deleteCard(cardId).then(() => {
    card.deleteCard();
  })
  .catch((err) => console.log(err))
  .finally(() => popupDeleteConfirm.renderLoading(false))
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{ name, about, avatar, _id }, items]) => {
    userInfo.setUserInfo({ name, about, avatar });
    userId = _id;
    cardSection.renderItems(items);
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

const popupDeleteConfirm = new PopupDeleteConfirm (popupDeleteConfirmSelector, handlePopupDeleteConfirm);
popupDeleteConfirm.setEventListeners();


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