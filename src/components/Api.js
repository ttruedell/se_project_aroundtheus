// export default class Api {
//   constructor(options) {
//     // constructor body
//     this.baseUrl = options.baseUrl;
//     this.headers = options.headers;
//   }

//   getInitialCards() {

//   }

//   // other methods for working with the API

// }
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
  getUserInfo() {
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

  createCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(c)
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

  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error disliking card:", error));
  }

  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch((error) => console.error("Error updating user info:", error));
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
