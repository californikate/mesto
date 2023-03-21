export default class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupImage = openPopupImage;
  }

  _getTemplate = () => {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton = () => {
    this._buttonLike.classList.toggle('element__like-button_active');
  }

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._openPopupImage(this._link, this._name);
    });

  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardTitle = this._element.querySelector('.element__title');
    this._cardTitle.textContent = this._name;

    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');

    this._setEventListeners();

    return this._element;
  }

}





