import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form-element');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    
    this._buttonSubmit = this._form.querySelector('.popup__save-button');
    this.textButtonSubmit = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
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