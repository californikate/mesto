export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, openPopupDeleteConfirm, handleLikeButton) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDeleteConfirm = openPopupDeleteConfirm;
    this._handleLikeButton = handleLikeButton;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }


  _updateLike() {
    this._handleLikeButton(this._cardId, this._likes, this._userId, this._likeCounter, (likes) => {
      this._buttonLike.classList.toggle('element__like-button_active');
      this._likes = likes;
    })
  }

  _handleDeleteButton() {
    this._openPopupDeleteConfirm(this._element, this._cardId);
  }

  // deleteCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._updateLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteButton();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage.src, this._cardImage.alt)
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardName = this._element.querySelector('.element__title');
    this._cardName.textContent = this._name;

    this._buttonLike = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._likes.length;

    if (this._likes.some((user) => user._id === this._userId)) {
      this._buttonLike.classList.add('element__like-button_active');
    }

    this._buttonDelete = this._element.querySelector('.element__delete-button');

    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    }

    this._setEventListeners();

    return this._element;
  }

}





