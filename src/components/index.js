import '../pages/index.css';

import {initialCards} from './data.js';
import {openPopup, closePopup, settings} from './modal.js';
import {closePopupOverlay, closePopupEsc} from './utils.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState} from './validate.js';
import {createPhoto, deletePhoto, openImagePlacePopup} from './card.js';

import {photoGridContainer, photoTemplate, photoTitleInput, photoLinkInput, popupImage, popupImagePhoto, popupImageTitle,
    popupCloseButtons, popupEdit, popupEditButton, editForm, profileName, profileAbout, inputName, inputAbout, popupEditSaveButton, popupEditAvatar, popupEditAvatarButton, 
    inputAvatar, editAvatarForm, popupEditAvatarSaveButton, profileAvatar, popupNewPlaceForm, popupNewPlaceSaveButton, popupNewPlaceTitle, popupNewPlaceLink, popupNewPlace, popupNewPlaceButton} from './variables.js';


//CARD

// Пройдемся по объекту initialCards
function renderPhotos(){ 
    initialCards.forEach((item)=> 
    renderPhoto(createPhoto(item.name, item.link), photoGridContainer)
    );
}
  
  // Добавление карточек в разметку
function renderPhoto(photo, container){ 
    container.prepend(photo);
}

function addNewPhoto(evt) { 
    evt.preventDefault();
    renderPhoto(createPhoto(photoTitleInput.value, photoLinkInput.value), photoGridContainer);
    photoTitleInput.value = '';
    photoLinkInput.value = '';
  
    closePopup(popupNewPlace);
}

popupNewPlaceForm.addEventListener('submit', addNewPhoto); 

//MODAL

//Сохранение переменных из инпутов в Popup-edit и наоборот
function renderEditPopup(){ 
    openPopup(popupEdit);
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}
  
function saveEditPopup(evt){ 
      evt.preventDefault();
      profileName.textContent = inputName.value;
      profileAbout.textContent = inputAbout.value;
      closePopup(popupEdit);
}

//Меняем аватар применяя полученную ссылку из input
function changeAvatar(evt){ 
    evt.preventDefault();
    profileAvatar.src = inputAvatar.value;
    closePopup(popupEditAvatar);
}

//Чтобы после первой добавленного поста и открытии модального окна добавления нового места кнопка не была доступна сразу
function renderNewCardPopup(){ 
    toggleButtonState(
      [popupNewPlaceTitle, popupNewPlaceLink],
      popupNewPlaceSaveButton,
      settings,
    );
    openPopup(popupNewPlace);
  }
  
popupEditButton.addEventListener('click', renderEditPopup); 

popupNewPlaceButton.addEventListener('click', renderNewCardPopup);

popupEditAvatarButton.addEventListener('click', function(){ 
  openPopup(popupEditAvatar);
});

editForm.addEventListener('submit', saveEditPopup); 

//Добавляем слушателя на форму editAvatarForm
editAvatarForm.addEventListener('submit', changeAvatar); 


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
