
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error'); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
} 
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error'); 
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
}
  
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  
    if (inputElement.validity.patternMismatch){
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
}
  
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input')); 
    const buttonElement = formElement.querySelector('.popup__button-save'); 
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function(){
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  
}
  
const enableValidation = () => { //
    //selectors = settings; 
    const formList = Array.from(document.querySelectorAll('.popup__form')); 
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt){
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
}
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}
  
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-save_disabled'); 
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__button-save_disabled'); 
      buttonElement.disabled = false;
    }
}

export {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState};
