import "./index.css";
import avatarSrc from "../images/Avatar.png";

const avatarImage = document.getElementById("Avatar-image");
avatarImage.src = avatarSrc;

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards, settings } from "../utils/constants.js";

import Api from "../components/Api.js";

//Elements: Edit Profile Modal//
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#edit-profile-form");

// Elements: Add Card Modal
const addNewCardButton = document.querySelector(".profile__add-button");
const cardForm = document.querySelector("#add-card-form");

//Elements: Image Preview Modal
const imagePreviewModal = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});

//Elements: Form Validators
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, cardForm);
addFormValidator.enableValidation();

const toggleAddButtonState = () => addFormValidator.toggleButtonState();

//Initialize Modals
const editProfileModal = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  // handleFormSubmit: (data) => {
  //   userInfo.setUserInfo({ name: data.name, job: data.job });
  // },
  handleFormSubmit: (data) => {
    api
      .updateUserInfo(data)
      .then((updatedUserInfo) => {
        userInfo.setUserInfo(updatedUserInfo);
        editProfileModal.close();
      })
      .catch((error) => console.error("Error updating user info:", error));
  },
});

const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  // handleFormSubmit: (data) => {
  //   const cardElement = createCard({ name: data.title, link: data.url });
  //   section.addItem(cardElement);
  //   cardForm.reset();
  //   toggleAddButtonState();
  // },
  handleFormSubmit: (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        const cardElement = createCard(newCard);
        section.addItem(cardElement);
        cardForm.reset();
        toggleAddButtonState();
        addCardModal.close();
      })
      .catch((error) => console.error("Error adding new card:", error));
  },
});

// Initialize User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

// Intialize Section
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards"
);

section.renderItems();

// Initialize API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "c58369c4-dcd4-4208-8726-c10df21880b5",
    "Content-Type": "application/json",
  },
});

// Fetch inital data
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    section.setItems(cards);
    section.renderItems();
  })
  .catch((error) => console.error("Error loading data:", error));

// Modal Event Listeners
editProfileModal.setEventListeners();
addCardModal.setEventListeners();
imagePreviewModal.setEventListeners();

//Function: Render Card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () =>
    handleImageClick(cardData.name, cardData.link)
  );
  //
  return card.getView();
}

//Event Handlers//
function handleImageClick(name, link) {
  imagePreviewModal.open({ name, link });
}

function handleProfileEditButton() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfileModal.open();
}

//Event Listeners//
profileEditButton.addEventListener("click", handleProfileEditButton);
addNewCardButton.addEventListener("click", () => addCardModal.open());

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1/",
//   headers: {
//     authorization: "c58369c4-dcd4-4208-8726-c10df21880b5",
//     "Content-Type": "application/json",
//   },
// });

// function renderUserInfo(user) {
//   userInfo.setUserInfo(user);
// }

// function renderCards(cards) {
//   cards.forEach((cardData) => {
//     const cardElement = createCard(cardData);
//     section.addItem(cardElement);
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   Promise.all([api.getUserInfo(), api.getInitialCards()])
//     .then(([user, cards]) => {
//       renderUserInfo(user);
//       renderCards(cards);
//     })
//     .catch((error) => console.error("Error loading data:", error));
// });
