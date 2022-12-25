// import { validate } from 'schema-utils';
import {closePopupOverlay, closePopupEsc} from './utils.js';
import {toggleButtonState, hasInvalidInput} from './validate.js'; 
import {popupCloseButtons, popupEdit, popupEditButton, editForm, profileName, profileAbout, inputName, inputAbout, popupEditSaveButton, popupEditAvatar, popupEditAvatarButton, 
  inputAvatar, editAvatarForm, popupEditAvatarSaveButton, profileAvatar, popupNewPlaceForm, popupNewPlaceSaveButton, popupNewPlaceTitle, popupNewPlaceLink, popupNewPlace, popupNewPlaceButton, popupConfirmDelete, popupConfirmDeleteForm, popupConfirmDeleteSubmitButton} from './variables.js';

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  disabledButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Открытие и закрытие попапов (popup-edit, popup-new-place)
function openPopup(popupElement){
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupOverlay);
}
  
function closePopup(popupElement){
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);
}

  //Сохранение переменных из инпутов в Popup-edit и наоборот
// function renderEditPopup(){}
  
// function saveEditPopup(evt){}

// //Меняем аватар применяя полученную ссылку из input
// function changeAvatar(evt){}

// Закрытие всех попапов нажатием кнопки "закрыть попап" для всех модальных окон
popupCloseButtons.forEach((item) => 
  item.addEventListener('click', (evt) =>
    closePopup(evt.target.closest('.popup'))
  )
);

//Чтобы после первой добавленного поста и открытии модального окна добавления нового места кнопка не была доступна сразу
// function renderNewCardPopup(){}

// popupNewPlaceButton.addEventListener('click', function(){
//   openPopup(popupNewPlace);
// });

// popupNewPlaceButton.addEventListener('click', renderNewCardPopup); 


export {openPopup, closePopup, settings};
