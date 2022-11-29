import {closePopupOverlay, closePopupEsc} from './utils.js';

//Объявляем переменные
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//popup edit profile
const popupEdit = document.querySelector('.popup-edit');
const popupEditButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup__edit-form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = document.querySelector('#input-name');
const inputAbout = document.querySelector('#input-about');
const popupEditSaveButton = editForm.querySelector('.edit-form__submit-button');

//popup edit avatar
const popupEditAvatar = document.querySelector('.popup-edit-avatar');
const popupEditAvatarButton = document.querySelector('.profile__image-container');
const inputAvatar = document.querySelector('#input-avatar');
const editAvatarForm = document.querySelector('.popup__edit-avatar-form');
const popupEditAvatarSaveButton = editAvatarForm.querySelector('.edit-avatar-form__submit-button');

const profileAvatar = document.querySelector('.profile__image');

// popup New place
const popupNewPlaceForm = document.querySelector('.popup__place-form');
const popupNewPlaceSaveButton = popupNewPlaceForm.querySelector('.place-form__submit-button');

const popupNewPlace = document.querySelector('.popup-new-place');
const popupNewPlaceButton = document.querySelector('.profile__add-button');

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

// Закрытие всех попапов нажатием кнопки "закрыть попап" для всех модальных окон
popupCloseButtons.forEach((item) => 
  item.addEventListener('click', (evt) =>
    closePopup(evt.target.closest('.popup'))
  )
);

popupEditButton.addEventListener('click', renderEditPopup);


popupNewPlaceButton.addEventListener('click', function(){
  openPopup(popupNewPlace);
});

popupEditAvatarButton.addEventListener('click', function(){
  openPopup(popupEditAvatar);
});

editForm.addEventListener('submit', saveEditPopup);

//Добавляем слушателя на форму editAvatarForm
editAvatarForm.addEventListener('submit', changeAvatar);

export {popupNewPlace, popupNewPlaceForm, openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar};
