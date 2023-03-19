export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(this._config.buttonSelector);
    this._formList = Array.from(document.querySelectorAll(this._config.formSelector));
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  // переключение состояния кнопки 
  _toggleButton = () => {
    const isFormValid = this._form.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._config.buttonDisabledClass, !isFormValid);
  }

  // показать ошибку
  _showInputError = (input) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
  
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  
  // скрыть ошибку
  _hideInputError = (input) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
  
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  };

  // добавляем элемент ошибки к инпуту
  _handleFormInput = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  // добавляем слушатели событий инпутам
  _setEventListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleFormInput(input);
        this._toggleButton();
      });
    });

    this._toggleButton();
  }

  // публичный метод для включения валидации формы
  enableValidation = () => {
      this._setEventListeners();
  };
  
  // публичный метод для очистки элемента ошибки
  resetValidateForm = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    });
    
    this._toggleButton();
  }
}