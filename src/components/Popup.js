export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOutsideModal = this._handleClickOutsideModal.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClickOutsideModal);
    // this.resetButtonText(".modal__button");
  }

  close() {
    this._popupElement.classList.add("modal_hide");
    setTimeout(() => {
      this._popupElement.classList.remove("modal_opened");
      this._popupElement.classList.remove("modal_hide");
    }, 200);
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleClickOutsideModal);
  }

  _handleEscClose(event) {
    if (
      event.key === "Escape" &&
      this._popupElement.classList.contains("modal_opened")
    ) {
      this.close();
    }
  }

  _handleClickOutsideModal(event) {
    if (
      this._isClickOutsideModalContainer(event) &&
      this._popupElement.classList.contains("modal_opened")
    ) {
      this.close();
    }
  }

  _isClickOutsideModalContainer(event) {
    const modalContainer = this._popupElement.querySelector(
      ".modal__js-container"
    );
    const modalRect = modalContainer.getBoundingClientRect();
    const clickX = event.clientX;
    const clickY = event.clientY;

    return (
      clickX < modalRect.left ||
      clickX > modalRect.right ||
      clickY < modalRect.top ||
      clickY > modalRect.bottom
    );
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());
  }
}
