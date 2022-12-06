import {initialCards} from './data.js';
import {popupNewPlace, popupNewPlaceForm, openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar, renderNewCardPopup} from './modal.js';
import {photoGridContainer, photoTemplate, photoTitleInput, photoLinkInput, popupImage, popupImagePhoto, popupImageTitle} from './variables.js';


// Рендер карточек 
function createPhoto (name, link) {
    const photoElement = photoTemplate.querySelector('.photo-grid__element').cloneNode(true);
    photoElement.querySelector('.photo-grid__title').textContent = name;
    const photoImage = photoElement.querySelector('.photo-grid__image');
    photoImage.src = link;
    photoImage.alt = name;
  
    photoImage.addEventListener('click', openImagePlacePopup);
  
    photoElement.querySelector('.photo-grid__like-button').addEventListener('click', (evt)=> {
      evt.target.classList.toggle('photo-grid__like-button_active');
    });
    
    photoElement.querySelector('.photo-grid__delete-button').addEventListener('click', deletePhoto);
  
    return photoElement;
}

// // Пройдемся по объекту initialCards
// function renderPhotos(){}
  
//   // Добавление карточек в разметку
// function renderPhoto(photo, container){}
  
// renderPhotos();
  
  
function deletePhoto(evt) {
    const photo = evt.target.closest('.photo-grid__element');
    photo.remove();
  }
  
// function addNewPhoto(evt) {}

function openImagePlacePopup(evt){
    const popupImg = evt.target;
    const popupImgElement = popupImg.closest('.photo-grid__element');
    const popupImgTitle = popupImgElement.querySelector('.photo-grid__title');
  
    popupImagePhoto.src = popupImg.src;
    popupImagePhoto.alt = popupImgTitle.textContent;
    popupImageTitle.textContent = popupImgTitle.textContent;

    openPopup(popupImage);
}
  
// popupNewPlaceForm.addEventListener('submit', addNewPhoto);

export {createPhoto, deletePhoto, openImagePlacePopup};