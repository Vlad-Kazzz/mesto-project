import '../pages/index.css';

import {initialCards} from './data.js';
import {openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar} from './modal.js';
import {closePopupOverlay, closePopupEsc} from './utils.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState} from './validate.js';
import {createPhoto, renderPhotos, renderPhoto, deletePhoto, addNewPhoto, openImagePlacePopup} from './card.js';

//Загрузка карточек
renderPhotos();

//Старт валидации
enableValidation();
