import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super({ popupSelector });
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_delete-card"
    );
    this._defaultButtonText = this._confirmButton.textContent;
    this.setEventListeners();
  }

  ///
  setButtonText(buttonSelector, newText) {
    const button = this._popupElement.querySelector(buttonSelector);
    if (button) {
      if (!this._defaultButtonText) {
        this._defaultButtonText = button.textContent;
      }
      button.textContent = newText;
    }
  }

  resetButtonText(buttonSelector) {
    const button = this._popupElement.querySelector(buttonSelector);
    if (button && this._defaultButtonText) {
      button.textContent = this._defaultButtonText;
    }
  }
  ///

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.setButtonText(".modal__button_delete-card", "Saving...");
      this._handleConfirm();
    });
  }

  open() {
    super.open();
    this.resetButtonText(".modal__button");
  }
}
