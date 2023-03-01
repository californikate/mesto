// валидация форм

const formValidationConfig = {
  formSelector: '.popup__form-element',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_disabled'
};

function disableSubmit(evt) {
  evt.preventDefault();
};

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.buttonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.buttonDisabledClass, !isFormValid);
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
};

function enableFormValidation(form, config) {
  form.addEventListener('submit', disableSubmit); 
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });
  
  setEventListeners(form, config);
  toggleButton(form, config);
};

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function(item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    });
  });
}

function showInputError (evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
};

function hideInputError (evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};


function handleFormInput(evt, config) {
  const input = evt.target;

  if (!input.validity.valid) {
    showInputError(evt, config);
  } else {
    hideInputError(evt, config);
  }
};

enableValidation(formValidationConfig);