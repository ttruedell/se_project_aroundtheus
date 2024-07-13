export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  getAllData() {
    return Promise.all([this.loadUserInfo(), this.getInitialCards()])
      .then(([user, cards]) => {
        return { user, cards };
      })
      .catch((error) => console.error("Error loading data:", error));
  }

  loadUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error fetching user info:", error));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error fetching initial cards:", error));
  }

  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error updating user info:", error));
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error creating card:", error));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error deleting card:", error));
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error liking card:", error));
  }

  unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error disliking card:", error));
  }

  updateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error updating user avatar:", error));
  }
}
