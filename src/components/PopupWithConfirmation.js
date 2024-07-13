import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, onConfirm }) {
    super({ popupSelector });
    // this._handleFormSubmit = handleFormSubmit;
    // this._popupForm = this._popupElement.querySelector(
    //   ".modal__container_delete-card"
    // );
    // this._submitButton = this._popupElement.querySelector(
    //   ".modal__button_delete-card"
    // );
    // this._submitHandler = this._submitHandler.bind(this);
    this._onCofirm = onConfirm;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._submitHandler);
  }

  // _submitHandler(event) {
  //   event.preventDefault();
  //   this._handleFormSubmit(this._card);
  // }

  setEventListeners() {
    super.setEventListeners();
    // this._popupForm.addEventListener("submit", this._submitHandler);
    //
    //
    const confirmButton = this._popupElement.querySelector(
      ".modal__button_delete-card"
    );
    confirmButton.addEventListener("click", () => {
      this._onConfirm(); // Call the confirm callback
      this.close();
    });
  }
}
