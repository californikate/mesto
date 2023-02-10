// Открытие и закрытие модального окна "Редактировать профиль"
// определяем переменные для кнопок и попапа
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

// определяем переменные для значения полей "Имя" и "О себе"
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//определяем переменную для формы отправки данных
const formElement = document.querySelector('.popup__form-element');

// определяем переменные для template
const cardTemplate = document.querySelector('#card-template').content;
const cardsOnline = document.querySelector('.elements__items');


// toggle добавления/удаления класса для открытия/закрытия попапа
function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
};

//функция открытия попапа по клику на кнопку "Добавить"
function handleAddButtonClick() {
  toggleOpenPopup();
};

// функция открытия попапа по клику на кнопку "Редактировать"
function handleEditButtonClick() {
  toggleOpenPopup();
  // При открытии формы поля "Имя" и "О себе" заполнены теми значениями, которые отображаются на странице
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

// дополнительно закрытие окна по клику на оверлэй - необходимо отредактировать
/* function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}; */

// Специальное событие submit отправляет форму
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  // закрытие формы после отправки
  toggleOpenPopup();
};

// функция нажатия кнопки лайка
function handlelikeButton (evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// Прикрепляем обработчики к формам, которые будут следить за событиями
addButton.addEventListener('click', handleAddButtonClick); // кнопка Добавить
editButton.addEventListener('click', handleEditButtonClick); // кнопка Редактировать
closeButton.addEventListener('click', toggleOpenPopup); // кнопка закрыть любой попап
// popup.addEventListener('click', handleOverlayClick); // клик на оверлэй

formElement.addEventListener('submit', handleFormSubmit); // отправка новых данных




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

//копируем и наполяем содержимым тег template
initialCards.forEach((element) => {
  const cardContainer = cardTemplate.querySelector('.element').cloneNode(true);
  cardContainer.querySelector('.element__photo').src = element.link;
  cardContainer.querySelector('.element__title').textContent = element.name;
  cardContainer.querySelector('.element__like-button').addEventListener('click', handlelikeButton);
  // отображаем на странице 
  cardsOnline.append(cardContainer);
});
