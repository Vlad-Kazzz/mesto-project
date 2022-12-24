import {initialCards} from './data.js';
import {popupNewPlace, popupNewPlaceForm, openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar, renderNewCardPopup} from './modal.js';
import {photoGridContainer, photoTemplate, photoTitleInput, photoLinkInput, popupImage, popupImagePhoto, popupImageTitle} from './variables.js';
import {userId, setUserId, handleError, getData, getProfileData, getInitialCards, updateProfileInfo, createCard, deleteCard, putLike, deleteLike} from './api.js';

//Данной функцией проверяем кто лайкнул пост. Если сам владелец выложил и лайкнул - то при загрузке карточка будет уже лайкнута
function likedByCurrentUser (card){
  return card.likes.some(like => like._id === userId);
}

// Рендер карточек 
function createPhoto (card) { //(name, link)
    const photoElement = photoTemplate.querySelector('.photo-grid__element').cloneNode(true);
    photoElement.querySelector('.photo-grid__title').textContent = card.name;
    const photoImage = photoElement.querySelector('.photo-grid__image');
    const likesCountText = photoElement.querySelector('.photo-grid__likes-count-text');
    likesCountText.textContent = card.likes.length;

    const likeButton = photoElement.querySelector('.photo-grid__like-button');

    //Постановка и снятие лайка 
    //Проверка, лайкнута карточка пользователем?
    if (likedByCurrentUser(card)){
      likeButton.classList.add('photo-grid__like-button_active');
    }

    photoElement.querySelector('.photo-grid__like-button').addEventListener('click', function (evt) {
      const isAlreadyLiked = evt.target.classList.contains('photo-grid__like-button_active');
      if (isAlreadyLiked){
        deleteLike(card._id)
          .then ((data) => {
            photoElement.querySelector('.photo-grid__like-button').classList.remove('photo-grid__like-button_active');
            likesCountText.textContent = data.likes.length; // Длина массива = кол.во лайков
          })
          .catch (handleError)
      } else {
        putLike(card._id)
          .then ((data) => {
            photoElement.querySelector('.photo-grid__like-button').classList.add('photo-grid__like-button_active');
            likesCountText.textContent = data.likes.length; // Длина массива = кол.во лайков 
          })
          .catch (handleError)
      }
    })

    //Убираем кнопку удаления чужих карточек
    const cardOwnerId = card.owner._id;
    if (userId!==cardOwnerId){
      photoElement.querySelector('.photo-grid__delete-button').classList.add('photo-grid__delete-button_hidden');
    } else { //Обрабатываем удаление карточки на сервере (Добавить модальное окно подтверждения удаления)
      photoElement.querySelector('.photo-grid__delete-button').addEventListener('click', function(){
        deleteCard(card._id)
          .then (() => {
            photoElement.remove();
          })
          .catch (handleError)
      })
    }

    photoImage.src = card.link;
    photoImage.alt = card.name;
  
    photoImage.addEventListener('click', openImagePlacePopup);
  
    //Постановка и снятие лайка
    
    // photoElement.querySelector('.photo-grid__like-button').addEventListener('click', (evt)=> {
    //   evt.target.classList.toggle('photo-grid__like-button_active');
    // });
    

    //Удаление карточки + проверка владельца карточки
    // photoElement.querySelector('.photo-grid__delete-button').addEventListener('click', deletePhoto);
  
    return photoElement;
}

// // Пройдемся по объекту initialCards
// function renderPhotos(){}
  
//   // Добавление карточек в разметку
// function renderPhoto(photo, container){}
  
// renderPhotos();


// function deletePhoto(evt) {
//     const photo = evt.target.closest('.photo-grid__element');
//     photo.remove();
//   }
  
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

export {createPhoto, openImagePlacePopup, likedByCurrentUser}; //deletePhoto