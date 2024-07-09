export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: "7fceffaf-7edb-4767-9088-73656e156a21",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  // other methods for working with the API

  loadUserInfo() {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me", {});
  }
}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "7fceffaf-7edb-4767-9088-73656e156a21",
//     "Content-Type": "application/json",
//   },
// });

// api
//   .getInitialCards()
//   .then((result) => {
//     // process the result
//   })
//   .catch((err) => {
//     console.error(err); // log the error to the console
//   });
