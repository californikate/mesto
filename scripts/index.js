// определяем переменные для кнопок и попапа
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
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

// массив данных для карточек
const initialCards = [
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

// починить кнопку закрытия на попапе Добавить и Картинка, починить попап Добавить
// функции добавления/удаления класса для открытия/закрытия любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

// функция открытия попапа по клику на кнопку "Редактировать"
function handleEditButtonClick() {
  openPopup(editPopup);
  // При открытии формы поля "Имя" и "О себе" заполнены теми значениями, которые отображаются на странице
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

// Специальное событие submit отправляет форму попапа Редактировать
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // закрытие формы после отправки
  closePopup(editPopup);
};

//функция открытия попапа по клику на кнопку "Добавить"
// УБРАТЬ В ОБРАБОТЧИКИ СОБЫТИЙ? или добавить при открытии пустые окна. 
//они по идее должны быть автоматически пустыми, если бы у меня работал этот попап
function handleAddButtonClick() {
  openPopup(addPopup);
};

// Специальное событие submit отправляет форму попапа Добавить
function handleFormCreate (evt) {
  evt.preventDefault();
  const element = createElement(placeNameInput.value, placeUrlInput.value);
  cardsList.prepend(element);
  evt.target.reset();
  // закрытие формы после отправки
  closePopup(addPopup);
};

// дополнительно закрытие окна по клику на оверлэй - необходимо отредактировать
/* function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}; */

// создание карточки
function createElement(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__photo');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector('.element__title');
  cardTitle.textContent = name;

  // нажатие кнопки лайка
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // нажатие кнопки "Удалить"
  const deleteButton = cardElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
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
editButton.addEventListener('click', handleEditButtonClick); // кнопка Редактировать
addButton.addEventListener('click', handleAddButtonClick); // кнопка Добавить
closeButton.addEventListener('click', closePopup); // кнопка закрыть любой попап
// popup.addEventListener('click', handleOverlayClick); // клик на оверлэй

editProfileForm.addEventListener('submit', handleFormSubmit); // отправка новых данных
addProfileForm.addEventListener('submit', handleFormCreate); // создание новой карточки
