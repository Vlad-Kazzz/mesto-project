import {initialCards} from './data.js';
import {popupNewPlace, popupNewPlaceForm, openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar} from './modal.js';

// Cards
const photoGridContainer = document.querySelector('.photo-grid__list');
const photoTemplate = document.querySelector('#photos-element').content;

// Add New place
const photoTitleInput = document.querySelector('#input-title');
const photoLinkInput = document.querySelector('#input-link');

// Images popup
const popupImage = document.querySelector('.popup-photos');
const popupImagePhoto = document.querySelector('.popup-photos__image');
const popupImageTitle = document.querySelector('.popup-photos__title');

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
  
// renderPhotos();
  
  
function deletePhoto(evt) {
    const photo = evt.target.closest('.photo-grid__element');
    photo.remove();
  }
  
function addNewPhoto(evt) {
    evt.preventDefault();
    renderPhoto(createPhoto(photoTitleInput.value, photoLinkInput.value), photoGridContainer);
    photoTitleInput.value = '';
    photoLinkInput.value = '';
  
    closePopup(popupNewPlace);
}

function openImagePlacePopup(evt){
    openPopup(popupImage);
    const popupImg = evt.target;
    const popupImgElement = popupImg.closest('.photo-grid__element');
    const popupImgTitle = popupImgElement.querySelector('.photo-grid__title');
  
    popupImagePhoto.src = popupImg.src;
    popupImagePhoto.alt = popupImgTitle.textContent;
    popupImageTitle.textContent = popupImgTitle.textContent;
}
  
popupNewPlaceForm.addEventListener('submit', addNewPhoto);

export {createPhoto, renderPhotos, renderPhoto, deletePhoto, addNewPhoto, openImagePlacePopup};