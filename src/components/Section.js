export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    console.log("Section initialized with items:", this._items);
  }

  renderItems(items) {
    console.log("Rendering items:", items);
    items.forEach((item) => {
      console.log("Rendering card:", item);
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  //
  //
  removeCard(cardId) {
    const cardElement = this._container.querySelector(`[data-id="${cardId}"]`);
    if (cardElement) {
      cardElement.remove();
    }
  }
}
