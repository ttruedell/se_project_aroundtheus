export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardImageElement.addEventListener("click", this._handleImageClick);
  }

  _handleLikeButton = () => {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector(".card__image");
    this._cardTextElement = this._element.querySelector(".card__text");
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTextElement.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
