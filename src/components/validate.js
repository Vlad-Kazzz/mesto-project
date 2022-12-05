
//Показать ошибку
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
} 

//Убрать ошибку
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass); 
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
}

//Проверка полей на валидность
const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  
    if (inputElement.validity.patternMismatch){
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
}

//Обработчик полей формы
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); 
    const buttonElement = formElement.querySelector(settings.submitButtonSelector); 
  
    toggleButtonState(inputList, buttonElement, settings);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function(){
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  
}
  
const enableValidation = (settings) => { 
    const formList = Array.from(document.querySelectorAll(settings.formSelector)); 
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt){
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
}

//Функция проверки массивов полей. True = хотя бы 1 поле не валидно. False = если все поля валидны
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

//Функция принимающая поля формы и кнопку, которая меняется в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.disabledButtonClass); 
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.disabledButtonClass); 
      buttonElement.disabled = false;
    }
}

export {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState};
