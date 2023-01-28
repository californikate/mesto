const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');


function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
}

function handleProfileEditButtonClick() {
  toggleOpenPopup();
}

function handleCloseButtonClick() {
  toggleOpenPopup();
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlayClick);
