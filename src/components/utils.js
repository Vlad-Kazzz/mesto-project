import {openPopup, closePopup, renderEditPopup, saveEditPopup, changeAvatar, renderNewCardPopup} from './modal.js';

function closePopupOverlay(evt){
    //Проверяем, если у нажатого элемента класс popup_opened, если нет - закрываем попап = клик по всему вне popup__content
    if (evt.target.classList.contains('popup_opened')){
      closePopup(document.querySelector('.popup_opened'));
    }
}

function closePopupEsc(evt){ //
    if (evt.keyCode === 27){
      closePopup(document.querySelector('.popup_opened'));
    }
}

export {closePopupOverlay, closePopupEsc};

