// Открытие и закрытие модального окна "Редактировать профиль"
// определяем переменные для кнопок и попапа

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

// определяем переменные для значения полей "Имя" и "О себе"

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//определяем переменную для формы отправки данных

const formElement = document.querySelector('.popup__form-element');

// toggle добавления/удаления класса для открытия/закрытия попапа
function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
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

// Прикрепляем обработчики к формам, которые будут следить за событиями

editButton.addEventListener('click', handleEditButtonClick); // кнопка Редактировать
closeButton.addEventListener('click', toggleOpenPopup); // кнопка закрыть попап
// popup.addEventListener('click', handleOverlayClick); // клик на оверлэй

formElement.addEventListener('submit', handleFormSubmit); // отправка новых данных