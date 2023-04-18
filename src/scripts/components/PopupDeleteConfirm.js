import Popup from "./Popup.js";

export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._buttonSubmit = this._popup.querySelector('.popup__save-button');
    this.textButtonSubmit = this._buttonSubmit.textContent;
  }

  setCard(cardId, card) {
    this._cardId = cardId;
    this._card = card;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.textContent = this.textButtonSubmit;
      this._buttonSubmit.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    // this._buttonDelete.addEventListener('click', this._deleteCard(this));
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._card);
      this.close();
    });
  }

  // _deleteCard() {
  //   this._handleDeleteCard(this._cardId, this._card);
  // }
}