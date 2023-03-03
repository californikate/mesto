// определяем переменные для кнопок открытия попапов
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

// определяем переменные для попапов
const popupEditProfile = document.querySelector('.edit-popup');
const popupAddPlace = document.querySelector('.add-popup');
const popupImage = document.querySelector('.image-popup');

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

// определяем переменные для template
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.elements__items');

// определяем переменные для кнопок закрытия попапов
const popupProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddPlaceCloseButton = popupAddPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');


// функции добавления/удаления класса для открытия/закрытия любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// закрытие попапа клавишей ESC
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// функция открытия попапа по клику на кнопку "Редактировать"
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

// Специальное событие submit отправляет форму попапа "Добавить"
function handleFormCreateCard (evt) {
  evt.preventDefault();
  const element = createElement(placeNameInput.value, placeUrlInput.value);
  cardsList.prepend(element);
  evt.target.reset();
  // закрытие формы после отправки
  closePopup(popupAddPlace);
};

// закрытие окна по клику на оверлэй
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


// создание карточки
function createElement(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__photo');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector('.element__title');
  cardTitle.textContent = name;

  // нажатие кнопки "Лайк"
  const buttonLike = cardElement.querySelector('.element__like-button');
  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // нажатие кнопки "Удалить"
  const buttonDelete = cardElement.querySelector('.element__delete-button');
  buttonDelete.addEventListener('click', function() {
    cardElement.remove();
  });

  //открытие попапа с большой картинкой
  const popupImagePhoto = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');
  cardImage.addEventListener('click', function(evt) {
    openPopup(popupImage);
    // добавляем значения для картинок и названий
    popupImagePhoto.src = link;
    popupImagePhoto.alt = name;
    popupImageCaption.textContent = name;
  });

  return cardElement;
};

//наполяем содержимым тег template
initialCards.forEach(function (card) {
  const element = createElement(card.name, card.link);
  cardsList.append(element);
});

// Прикрепляем обработчики к формам, которые будут следить за событиями
popupProfileOpenButton.addEventListener('click', handlePopupProfileOpenButton); // кнопка "Редактировать"

// функция открытия попапа по клику на кнопку "Добавить"
popupAddPlaceOpenButton.addEventListener('click', function() {
  placeNameInput.value = '';
  placeUrlInput.value = '';
  toggleButton(formCreateCard, formValidationConfig);
  openPopup(popupAddPlace);
});

formEditProfile.addEventListener('submit', handleFormEditProfile); // отправка новых данных
formCreateCard.addEventListener('submit', handleFormCreateCard); // создание новой карточки

// закрыть форму редактирование профиля
popupProfileCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

// закрыть форму добавления
popupAddPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupAddPlace)
});

// закрыть попас с картинкой
popupImageCloseButton.addEventListener('click',function () {
  closePopup(popupImage)
});

handleOverlayClick();



