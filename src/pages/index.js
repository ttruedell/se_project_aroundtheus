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
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name, job: data.job });
  },
});

const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    const cardElement = createCard({ name: data.title, link: data.url });
    section.addItem(cardElement);
    cardForm.reset();
    toggleAddButtonState();
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
