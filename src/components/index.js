import '../pages/index.css';

import {initialCards} from './data.js';
import {openPopup, closePopup, settings} from './modal.js';
import {closePopupOverlay, closePopupEsc} from './utils.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState} from './validate.js';
import {createPhoto, deletePhoto, openImagePlacePopup} from './card.js';
import {photoGridContainer, photoTemplate, photoTitleInput, photoLinkInput, popupImage, popupImagePhoto, popupImageTitle, popupCloseButtons, popupEdit, popupEditButton, editForm, profileName, profileAbout, inputName, inputAbout, popupEditSaveButton, popupEditAvatar, popupEditAvatarButton, inputAvatar, editAvatarForm, popupEditAvatarSaveButton, profileAvatar, popupNewPlaceForm, popupNewPlaceSaveButton, popupNewPlaceTitle, popupNewPlaceLink, popupNewPlace, popupNewPlaceButton} from './variables.js';
import {userId, setUserId, handleError, getData, getProfileData, getInitialCards, updateProfileInfo, createCard, deleteCard} from './api.js';


//CARD

// Пройдемся по объекту initialCards (После этого метода будем пользоваться загрузкой с сервера (см. в конце))
// function renderPhotos(){ 
//     initialCards.forEach((item)=> 
//     renderPhoto(createPhoto(item), photoGridContainer) //(item.name, item.link)
//     );
// }
  
  // Добавление карточек в разметку
function renderPhoto(photo, container){ 
    container.prepend(photo);
}

function addNewPhoto(evt) { 
    evt.preventDefault();

    popupNewPlaceSaveButton.textContent = "Создание...";

    //API JS 
    createCard(photoTitleInput.value, photoLinkInput.value)
      .then ((data) => {
        renderPhoto(createPhoto(data), photoGridContainer); //(data.name, data.link)
        closePopup(popupNewPlace);
      })
      .catch (handleError)
      .finally (() => {
        setTimeout(() =>  popupNewPlaceSaveButton.textContent = "Создать", 1000);
      });

    // renderPhoto(createPhoto(photoTitleInput.value, photoLinkInput.value), photoGridContainer);
    // photoTitleInput.value = '';
    // photoLinkInput.value = '';
  
    // closePopup(popupNewPlace);
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

popupNewPlaceButton.addEventListener('click', renderNewCardPopup);
popupNewPlaceForm.addEventListener('submit', addNewPhoto); 

//MODAL

//Сохранение переменных из инпутов в Popup-edit и наоборот
function renderEditPopup(){ 
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;

    toggleButtonState(
      [inputName, inputAbout],
      popupEditSaveButton,
      settings,
    );

    openPopup(popupEdit);
}
  
function saveEditPopup(evt){ 
      evt.preventDefault();

      popupEditSaveButton.textContent = "Сохранение...";

      updateProfileInfo(inputName.value, inputAbout.value)
        .then (data => {
          profileName.textContent = data.name;
          profileAbout.textContent = data.about;
          closePopup(popupEdit);
        })
        .catch (handleError)
        .finally (() => {
          setTimeout(() =>  popupEditSaveButton.textContent = "Сохранить", 1000);
        });
}

popupEditButton.addEventListener('click', renderEditPopup);
editForm.addEventListener('submit', saveEditPopup);

//Меняем аватар применяя полученную ссылку из input
function changeAvatar(evt){ 
    evt.preventDefault();
    profileAvatar.src = inputAvatar.value;
    closePopup(popupEditAvatar);
}

//Чтобы после первой добавленного поста и открытии модального окна добавления нового места кнопка не была доступна сразу
// function renderNewCardPopup(){ 
//     toggleButtonState(
//       [popupNewPlaceTitle, popupNewPlaceLink],
//       popupNewPlaceSaveButton,
//       settings,
//     );
//     openPopup(popupNewPlace);
//   }
   

// popupNewPlaceButton.addEventListener('click', renderNewCardPopup);

popupEditAvatarButton.addEventListener('click', function(){ 
  openPopup(popupEditAvatar);
});


//Добавляем слушателя на форму editAvatarForm
editAvatarForm.addEventListener('submit', changeAvatar); 

// getProfileData();
// getInitialCards();

//Загрузка карточек (После этого метода будем пользоваться загрузкой карточек с сервера (см. в конце))
// renderPhotos();

//Старт валидации
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    disabledButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
});

Promise.all ([
  getProfileData(), 
  getInitialCards(),
])
  .then (data => {
    setUserId(data[0]._id);
    profileName.textContent = data[0].name;
    profileAbout.textContent = data[0].about;

    data[1].reverse().forEach(card => {
      renderPhoto(createPhoto(card), photoGridContainer);
    })
  })
  .catch (handleError);
