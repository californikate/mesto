export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, like, dislike, handleDeleteButton) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._like = like;
    this._dislike = dislike;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton() {
    if (this._buttonLike.contains('.element__like-button_active')) {
      this._dislike();
    } else {
      this._like();
    }
  }


  // перепродумать метод
  setLike(res) {
    this._likeNumber.textContent = `${res.likes.length}`;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton();
    });

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
    this._likeNumber = this._element.querySelector('.element__like-counter');
    this._likeCounter = this._likes.length;
    this._likeNumber.textContent = this._likes.length;

    if (this._likes.some((element) => this._userId === element.id)) {
      this._buttonLike.classList.add('.element__like-button_active');
    } else {
      this._buttonLike.classList.remove('.element__like-button_active');
    }

    this._buttonDelete = this._element.querySelector('.element__delete-button');

    if (this._ownerId === this._userId) {
      this._buttonDelete.addEventListener('click', () => {
        this._handleDeleteButton();
      })
    } else {
      this._buttonDelete.remove();
    }

    this._setEventListeners();

    return this._element;
  }

}





