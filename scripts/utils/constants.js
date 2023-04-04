export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formValidationConfig = {
  formSelector: '.popup__form-element',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_disabled'
};

export const cardsListSelector = '.elements__items';
export const cardTemplateSelector = '#card-template';

export const popupEditProfileSelector = '.edit-popup';
export const popupAddPlaceSelector = '.add-popup';
export const popupImageSelector = '.image-popup';

// определяем переменные для кнопок открытия попапов
export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

//определяем переменную для формы отправки данных
export const formEditProfile = document.querySelector('#edit-profile');
export const formCreateCard = document.querySelector('#add-profile');


// определяем переменные для значения полей "Имя" и "О себе"
export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileJobInput = document.querySelector('.popup__input_type_job');