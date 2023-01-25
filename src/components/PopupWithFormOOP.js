import Popup from "./PopupOOP.js"

export default class PopupWithForm extends Popup {
    constructor (popup, handleSubmit){
        super (popup);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form ');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__button-save');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues(){
      const inputValues = []
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value
        });
        return inputValues;                                                          //Посмотреть!!!
    } 

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(loadingText = "Сохранение...", isOnLoad) {
        if (isOnLoad){
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton = this._submitButtonText;
        }
        
        // this._submitButtonText = loadingText;
    }

    setEventListeners(){
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues())
      })
    }
    
}
