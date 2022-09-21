//Объявляем переменные
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');

//popup edit profile
const popupEdit = document.querySelector('.popup-edit');
const popupEditButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup__edit-form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = document.querySelector('#inputName');
const inputAbout = document.querySelector('#inputAbout');
const popupEditSaveButton = editForm.querySelector('.edit-form__submit-button');
const popupSubmitButton = document.querySelector('.popup__button-save');
const popupNewPlace = document.querySelector('.popup-new-place');
const popupNewPlaceButton = document.querySelector('.profile__add-button');

// Cards
const photoGridList = document.querySelector('.photo-grid__list');
const photoTemplate = document.querySelector('#photos-element').content;


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

// Закрытие всех попапов нажатием кнопки "закрыть попап" для всех модальных окон
popupCloseButton.forEach((item) => 
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

function createPhoto (name, link) {
  const photoElement = photoTemplate.querySelector('.photo-grid__element').cloneNode(true);
  photoElement.querySelector('.photo-grid__title').textContent = name;
  const photoImage = photoElement.querySelector('.photo-grid__image');
  photoImage.src = link;
  photoImage.alt = name;
  // photoImage.addEvenetListener('click', );

  photoElement.querySelector('.photo-grid__like-button').addEventListener('click', (evt)=> {
    evt.target.classList.toggle('photo-grid__like-button_active');
  });
  
  // photoElement.querySelector('.photo-grid__delete-button');

  return photoElement;
}

function renderPhoto(photo, container){
  container.append(photo);
}

function renderPhotos(){
  initialCards.forEach((item)=> 
    renderPhoto(createPhoto(item.name, item.link), photoGridList)
  );
}

renderPhotos();



