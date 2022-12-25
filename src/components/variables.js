// Cards; Объявдяем переменные
const photoGridContainer = document.querySelector('.photo-grid__list');
const photoTemplate = document.querySelector('#photos-element').content;

// Add New place
const photoTitleInput = document.querySelector('#input-title');
const photoLinkInput = document.querySelector('#input-link');

// Images popup
const popupImage = document.querySelector('.popup-photos');
const popupImagePhoto = document.querySelector('.popup-photos__image');
const popupImageTitle = document.querySelector('.popup-photos__title');

//Modal; Объявляем переменные
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

const editAvatarForm = document.querySelector('.popup__edit-avatar-form');
const inputAvatar = editAvatarForm.querySelector('#input-avatar');
const popupEditAvatarSaveButton = editAvatarForm.querySelector('.edit-avatar-form__submit-button');

const profileAvatar = document.querySelector('.profile__image');

// popup New place
const popupNewPlaceForm = document.querySelector('.popup__place-form');
const popupNewPlaceSaveButton = popupNewPlaceForm.querySelector('.place-form__submit-button');
const popupNewPlaceTitle = popupNewPlaceForm.querySelector('#input-title');
const popupNewPlaceLink = popupNewPlaceForm.querySelector('#input-link');

const popupNewPlace = document.querySelector('.popup-new-place');
const popupNewPlaceButton = document.querySelector('.profile__add-button');

// popup Confirm Delete
const popupConfirmDelete = document.querySelector('.popup__confirm-delete');
const popupConfirmDeleteForm = document.querySelector('.popup__confirm-delete-form');
const popupConfirmDeleteSubmitButton = popupConfirmDeleteForm.querySelector('.popup__confirm-delete-button');

export {photoGridContainer, photoTemplate, photoTitleInput, photoLinkInput, popupImage, popupImagePhoto, popupImageTitle,
popupCloseButtons, popupEdit, popupEditButton, editForm, profileName, profileAbout, inputName, inputAbout, popupEditSaveButton, popupEditAvatar, popupEditAvatarButton, 
inputAvatar, editAvatarForm, popupEditAvatarSaveButton, profileAvatar, popupNewPlaceForm, popupNewPlaceSaveButton, popupNewPlaceTitle, popupNewPlaceLink, popupNewPlace, popupNewPlaceButton, popupConfirmDelete, popupConfirmDeleteForm, popupConfirmDeleteSubmitButton};
