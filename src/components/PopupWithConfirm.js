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
  setButtonText(newText) {
    this._confirmButton.textContent = newText;
  }

  resetButtonText() {
    this._confirmButton.textContent = this._defaultButtonText;
  }
  ///

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.setButtonText("Saving...");
      this._handleConfirm();
      const result = this._handleConfirm;
      if (result instanceof Promise) {
        result
          .then(() => {
            this.close();
          })
          .catch((error) => {
            console.error("Error during confirmation:", error);
          })
          .finally(() => {
            this.resetButtonText();
          });
      } else {
        this.close();
      }
    });
  }

  open() {
    super.open();
    this.resetButtonText();
  }
}
