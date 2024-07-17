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

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.loadUserInfo(), this.getInitialCards()]).then(
      ([user, cards]) => {
        return { user, cards };
      }
    );
    // .catch((error) => console.error("Error loading data:", error));
  }

  // loadUserInfo() {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error fetching user info:", error));
  // }

  loadUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
    // .catch((error) => console.error("Error fetching initial cards:", error));
  }

  // getInitialCards() {
  //   return fetch(`${this.baseUrl}/cards`, {
  //     method: "GET",
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error fetching initial cards:", error));
  // }

  updateUserInfo(data) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    // .catch((error) => console.error("Error updating user info:", error));
  }

  // updateUserInfo(data) {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       about: data.about,
  //     }),
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error updating user info:", error));
  // }

  addCard(data) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    // .catch((error) => console.error("Error creating card:", error));
  }

  // addCard(data) {
  //   return fetch(`${this.baseUrl}/cards`, {
  //     method: "POST",
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       link: data.link,
  //     }),
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error creating card:", error));
  // }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
    // .catch((error) => console.error("Error deleting card:", error));
  }

  // deleteCard(cardId) {
  //   return fetch(`${this.baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error deleting card:", error));
  // }

  likeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
    // .catch((error) => console.error("Error liking card:", error));
  }

  // likeCard(cardId) {
  //   return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error liking card:", error));
  // }

  unlikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
    // .catch((error) => console.error("Error disliking card:", error));
  }

  // unlikeCard(cardId) {
  //   return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this.headers,
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error disliking card:", error));
  // }

  updateUserAvatar(data) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    // .catch((error) => console.error("Error updating user avatar:", error));
  }

  // updateUserAvatar(data) {
  //   return fetch(`${this.baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       avatar: data.avatar,
  //     }),
  //   }).then(this._checkResponse);
  //   // .catch((error) => console.error("Error updating user avatar:", error));
  // }
}
