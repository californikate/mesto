const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('#popup__form_element');
const nameInput = document.querySelector('.popup__form_name');
const jobInput = document.querySelector('.popup__form_job');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
};

function handleEditButtonClick() {
  toggleOpenPopup();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

function handleCloseButtonClick() {
  toggleOpenPopup();
};

//function handleOverlayClick(event) {
//  if (event.target === event.currentTarget) {
//    toggleOpenPopup();
//  }
//};

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  handleCloseButtonClick();
  console.log('hello');
};

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlayClick);

formElement.addEventListener('submit', handleFormSubmit); 