import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super({ popupSelector });
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_delete-card"
    );
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm();
      this.setButtonText(".modal__button_delete-card", "Saving...");
      this.close();
    });
  }
}
