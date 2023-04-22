import Popup from "./Popup.js";

export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form-element')
    this._handleFormSubmit = handleFormSubmit;

    this._buttonSubmit = this._popup.querySelector('.popup__save-button');
    this.textButtonSubmit = this._buttonSubmit.textContent;
  }

  setCard(cardId, card) {
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._card);
      this.close();
    });
  }  

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._buttonSubmit.textContent = text;
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.textContent = this.textButtonSubmit;
      this._buttonSubmit.disabled = false;
    }
  }
}