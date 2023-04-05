import './index.css';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';

import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

import { initialCards, 
  formValidationConfig, 
  popupProfileOpenButton, 
  popupAddPlaceOpenButton, 
  formEditProfile,
  formCreateCard,
  profileNameInput,
  profileJobInput,
  cardTemplateSelector,
  cardsListSelector,
  popupEditProfileSelector,
  popupAddPlaceSelector,
  popupImageSelector
} from '../scripts/utils/constants.js';



// включаем валидацию каждой формы
const formValidatorProfile = new FormValidator(formValidationConfig, formEditProfile);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(formValidationConfig, formCreateCard);
formValidatorCard.enableValidation();

// открыть картинку при нажатии на карточку
const handleCardClick = (link, title) => {
  popupImage.open(link, title);
}

// создать карточку
const createCard = (data) => {
  return new Card(data, cardTemplateSelector, handleCardClick).generateCard();
}

// отрисовать карточку
const renderCard = (data) => {
  cardSection.addItem(createCard(data));
}

// создать массив карточек
const cardSection = new Section({
  items: initialCards,
  renderer: renderCard
  }, cardsListSelector);

cardSection.renderer();

// информация о пользователе
const userInfo = new UserInfo({
  selectorProfileName: '.profile__title', 
  selectorProfileJob: '.profile__subtitle'
});

// открыть попап по клику на кнопку "Редактировать"
const handlePopupProfileOpenButton = () => {
  
  // При открытии формы поля "Имя" и "О себе" заполнены теми значениями, которые отображаются на странице
  const {name, job} = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileJobInput.value = job;

  // удалить ошибки
  formValidatorProfile.resetValidateForm();
  popupEditProfile.open();
};

// Специальное событие submit отправляет форму попапа "Редактировать"
const handleFormEditProfile = (data) => {
  userInfo.setUserInfo(data);
};

// открыть попап по клику на кнопку "Добавить"
const handlePopupAddPlaceOpenButton = () => {
  // удалить ошибки
  formValidatorCard.resetValidateForm();
  popupAddPlace.open();
};

// Специальное событие submit отправляет форму попапа "Добавить"
const handleFormCreateCard = ({place: name, link}) => {
  renderCard({name, link});
};

// создаем для каждого попапа свой экземпляр класса PopupWithForm

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popupEditProfile = new PopupWithForm (popupEditProfileSelector, handleFormEditProfile);
popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm (popupAddPlaceSelector, handleFormCreateCard);
popupAddPlace.setEventListeners();


popupProfileOpenButton.addEventListener('click', handlePopupProfileOpenButton); // слущатель кнопки "Редактировать"
popupAddPlaceOpenButton.addEventListener('click', handlePopupAddPlaceOpenButton); // слушатель кнопки "Добавить"