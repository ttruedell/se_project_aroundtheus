import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super({ popupSelector });
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_delete-card"
    );
    this._defaultButtonText = this._confirmButton.textContent;
  }

  ///
  setButtonText(newText) {
    console.log("Setting button text to:", newText);
    this._confirmButton.textContent = newText;
  }

  resetButtonText() {
    console.log("Resetting button text to default.");
    this._confirmButton.textContent = this._defaultButtonText;
  }
  ///

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Button clicked: Setting text to 'Deleting...'");
      this.setButtonText("Deleting...");
      const result = this._handleConfirm();
      console.log("Handle confirm result:", result);

      if (result instanceof Promise) {
        result
          .then(() => {
            console.log("Promise resolved: Closing modal");
            this.close();
          })
          .catch((error) => {
            console.error("Error during confirmation:", error);
          })
          .finally(() => {
            console.log("Finally block: Resetting button text");
            this.resetButtonText();
          });
      } else {
        console.log(
          "Synchronous action: Closing modal and resetting button text"
        );
        this.close();
        this.resetButtonText();
      }
    });
  }
}
