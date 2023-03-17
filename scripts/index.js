import Card from './Card.js';
import * as data from './FormValidator.js';
import { initialCards } from './constants.js';

// определяем переменные для кнопок открытия попапов
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

// определяем переменные для попапов
const popupEditProfile = document.querySelector('.edit-popup');
const popupAddPlace = document.querySelector('.add-popup');
const popupImage = document.querySelector('.image-popup');

// определяем переменные для кнопок закрытия попапов
const popupProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddPlaceCloseButton = popupAddPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

// определяем переменные для значения полей "Имя" и "О себе"
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// определяем переменные для полей "Название" и "Ссылка на картинку"
const placeNameInput = document.querySelector('.popup__input_type_place');
const placeUrlInput = document.querySelector('.popup__input_type_url');

//определяем переменную для формы отправки данных
const formEditProfile = document.querySelector('#edit-profile');
const formCreateCard = document.querySelector('#add-profile');

const cardsList = document.querySelector('.elements__items');

const popupImagePhoto = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');


function createCard (data) {
  return new Card(data, '#card-template', openPopupImage).generateCard();
}

initialCards.forEach((data) => {
  cardsList.append(createCard(data));
});

// открыть любой попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

// закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// закрыть попап клавишей ESC
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// закрыть попап по клику на оверлэй
function handleOverlayClick(){
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
      };
    });
  });
};

handleOverlayClick();

// открыть попап по клику на кнопку "Редактировать"
function handlePopupProfileOpenButton() {
  openPopup(popupEditProfile);
  // При открытии формы поля "Имя" и "О себе" заполнены теми значениями, которые отображаются на странице
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  toggleButton(formEditProfile, formValidationConfig);
};

// Специальное событие submit отправляет форму попапа "Редактировать"
function handleFormEditProfile (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  // закрытие формы после отправки
  closePopup(popupEditProfile);
};

// закрыть попап редактирование профиля
popupProfileCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

popupProfileOpenButton.addEventListener('click', handlePopupProfileOpenButton); // кнопка "Редактировать"
formEditProfile.addEventListener('submit', handleFormEditProfile); // отправка новых данных

// открыть попап по клику на кнопку "Добавить"
popupAddPlaceOpenButton.addEventListener('click', function() {
  placeNameInput.value = '';
  placeUrlInput.value = '';
  toggleButton(formCreateCard, formValidationConfig);
  openPopup(popupAddPlace);
});

// Специальное событие submit отправляет форму попапа "Добавить"
function handleFormCreateCard (evt) {
  evt.preventDefault();
  const element = createElement(placeNameInput.value, placeUrlInput.value);
  cardsList.prepend(element);
  evt.target.reset();
  // закрытие формы после отправки
  closePopup(popupAddPlace);
};

// закрыть попап добавления
popupAddPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupAddPlace)
});

formCreateCard.addEventListener('submit', handleFormCreateCard); // создание новой карточки

// открыть попап с большой картинкой
function openPopupImage (link, name) {
  openPopup(popupImage);
  // добавляем значения для картинок и названий
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;
};

// закрыть попас с картинкой
popupImageCloseButton.addEventListener('click',function () {
  closePopup(popupImage)
});
