// определяем переменные для кнопок открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// определяем переменные для попапов
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const imagePopup = document.querySelector('.image-popup');

// определяем переменные для значения полей "Имя" и "О себе"
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// определяем переменные для полей "Название" и "Ссылка на картинку"
const placeNameInput = document.querySelector('.popup__input_type_place');
const placeUrlInput = document.querySelector('.popup__input_type_url');

//определяем переменную для формы отправки данных
const editProfileForm = document.querySelector('#edit-profile');
const addProfileForm = document.querySelector('#add-profile');

// определяем переменные для template
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.elements__items');

// определяем переменные для кнопок закрытия попапов
const editPopupClose = editPopup.querySelector('.popup__close-button');
const addProfileClose = addPopup.querySelector('.popup__close-button');
const imagePopupClose = imagePopup.querySelector('.popup__close-button');


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
function handleEditButtonClick() {
  openPopup(editPopup);
  // При открытии формы поля "Имя" и "О себе" заполнены теми значениями, которые отображаются на странице
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

// Специальное событие submit отправляет форму попапа "Редактировать"
function handleFormEditProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // закрытие формы после отправки
  closePopup(editPopup);
};

// Специальное событие submit отправляет форму попапа "Добавить"
function handleFormCreateCard (evt) {
  evt.preventDefault();
  const element = createElement(placeNameInput.value, placeUrlInput.value);
  cardsList.prepend(element);
  evt.target.reset();
  // закрытие формы после отправки
  closePopup(addPopup);
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
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // нажатие кнопки "Удалить"
  const deleteButton = cardElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function() {
    cardElement.remove();
  });

  //открытие попапа с большой картинкой
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  cardImage.addEventListener('click', function(evt) {
    openPopup(imagePopup);
    // добавляем значения для картинок и названий
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
  });

  return cardElement;
};

//наполяем содержимым тег template
initialCards.forEach(function (card) {
  const element = createElement(card.name, card.link);
  cardsList.append(element);
});

// Прикрепляем обработчики к формам, которые будут следить за событиями
editButton.addEventListener('click', handleEditButtonClick); // кнопка "Редактировать"

// функция открытия попапа по клику на кнопку "Добавить"
addButton.addEventListener('click', function() {
  placeNameInput.value = '';
  placeUrlInput.value = '';
  openPopup(addPopup);
});

editProfileForm.addEventListener('submit', handleFormEditProfile); // отправка новых данных
addProfileForm.addEventListener('submit', handleFormCreateCard); // создание новой карточки

// закрыть форму редактирование профиля
editPopupClose.addEventListener('click', function() {
  closePopup(editPopup);
});

// закрыть форму добавления
addProfileClose.addEventListener('click', function() {
  closePopup(addPopup)
});

// закрыть попас с картинкой
imagePopupClose.addEventListener('click',function () {
  closePopup(imagePopup)
});

handleOverlayClick();



