import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(
      ".modal__button_confirm-form"
    );
    //
    this._submitBtnText = this._submitButton.textContent;
  }

  ////
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }
  /////

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      // this._handleFormSubmit(this._getInputValues());
      const result = this._handleFormSubmit(this._getInputValues());
      if (result instanceof Promise) {
        result
          .then(() => {
            this.close();
          })
          .catch((error) => {
            console.error("Error during confirmation:", error);
          });
      } else {
        this.close();
      }
    });
  }
  //

  // _isValidForm() {
  //   const inputValues = this._getInputValues();
  //   if (!inputValues.avatar) {
  //     console.error("Avatar is required.");
  //     return false;
  //   }
  //   return true;
  // }

  close() {
    super.close();
    this._form.reset();
  }
}
