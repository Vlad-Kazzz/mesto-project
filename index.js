//Объявляем переменные
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//popup edit profile
const popupEdit = document.querySelector('.popup-edit');
const popupEditButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup__edit-form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = document.querySelector('#inputName');
const inputAbout = document.querySelector('#inputAbout');
const popupEditSaveButton = editForm.querySelector('.edit-form__submit-button');

//popup edit avatar
const popupEditAvatar = document.querySelector('.popup-edit-avatar');
const popupEditAvatarButton = document.querySelector('.profile__image-container');
const inputAvatar = document.querySelector('#inputAvatar');
const editAvatarForm = document.querySelector('.popup__edit-avatar-form');
const popupEditAvatarSaveButton = editAvatarForm.querySelector('.edit-avatar-form__submit-button');

const profileAvatar = document.querySelector('.profile__image');

// popup New place
const popupNewPlaceForm = document.querySelector('.popup__place-form');
const popupNewPlaceSaveButton = popupNewPlaceForm.querySelector('.place-form__submit-button');

// const popupSubmitButton = document.querySelector('.popup__button-save');
const popupNewPlace = document.querySelector('.popup-new-place');
const popupNewPlaceButton = document.querySelector('.profile__add-button');

// Cards
const photoGridContainer = document.querySelector('.photo-grid__list');
const photoTemplate = document.querySelector('#photos-element').content;


// Add New place
const photoTitleInput = document.querySelector('#inputTitle');
const photoLinkInput = document.querySelector('#inputLink');

// Images popup
const popupImage = document.querySelector('.popup-photos');
const popupImagePhoto = document.querySelector('.popup-photos__image');
const popupImageTitle = document.querySelector('.popup-photos__title');

// Перенести функции сразу после переменных

// Открытие и закрытие попапов (popup-edit, popup-new-place)
function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
}

popupEditButton.addEventListener('click', renderEditPopup);


popupNewPlaceButton.addEventListener('click', function(){
  openPopup(popupNewPlace);
});

popupEditAvatarButton.addEventListener('click', function(){
  openPopup(popupEditAvatar);
});

// Закрытие всех попапов нажатием кнопки "закрыть попап" для всех модальных окон
popupCloseButtons.forEach((item) => 
  item.addEventListener('click', (evt) =>
    closePopup(evt.target.closest('.popup'))
  )
);


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
editForm.addEventListener('submit', saveEditPopup);

//Меняем аватар применяя полученную ссылку из input
function changeAvatar(evt){
  evt.preventDefault();
  profileAvatar.src = inputAvatar.value;
  closePopup(popupEditAvatar);
}

//Добавляем слушателя на форму editAvatarForm
editAvatarForm.addEventListener('submit', changeAvatar);

//Шесть карточек "из коробки"
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

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

renderPhotos();


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

popupNewPlaceForm.addEventListener('submit', addNewPhoto);

function openImagePlacePopup(evt){
  openPopup(popupImage);
  const popupImg = evt.target;
  const popupImgElement = popupImg.closest('.photo-grid__element');
  const popupImgTitle = popupImgElement.querySelector('.photo-grid__title');

  popupImagePhoto.src = popupImg.src;
  popupImagePhoto.alt = popupImgTitle.textContent;
  popupImageTitle.textContent = popupImgTitle.textContent;
}