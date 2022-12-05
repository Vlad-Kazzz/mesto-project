import '../pages/index.css';

import {initialCards} from './data.js';
import {openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar} from './modal.js';
import {closePopupOverlay, closePopupEsc} from './utils.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState} from './validate.js';
import {createPhoto, renderPhotos, renderPhoto, deletePhoto, addNewPhoto, openImagePlacePopup} from './card.js';

//Загрузка карточек
renderPhotos();

//Старт валидации
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    disabledButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
});
