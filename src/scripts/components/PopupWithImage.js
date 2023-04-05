import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(link, title) {
    super.open();
    this._popupImagePhoto.src = link;
    this._popupImagePhoto.alt = title;
    this._popupImageCaption.textContent = title;
  }
}