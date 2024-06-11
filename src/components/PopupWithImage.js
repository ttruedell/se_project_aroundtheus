import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._captionElement = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }

  open(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    this._captionElement.textContent = data.name;
    super.open();
  }
}
