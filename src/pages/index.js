import "../pages/index.css";
import avatarSrc from "../images/Avatar.png";
import editAvatarSrc from "../images/edit-avatar-vector.svg";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards, settings } from "../utils/constants.js";

import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/////////////////////////////////////////////////////////////
//       Elements      ////////////////////////////////////
/////////////////////////////////////////////////////////

//Elements: Profile Avatar//
const avatarImage = document.getElementById("Avatar-image");
const editVector = document.getElementById("Avatar-edit-vector");
editVector.src = editAvatarSrc;
avatarImage.src = avatarSrc;

//Elements: Edit Avatar Modal//
const avatarForm = document.querySelector("#edit-avatar-form");

//Elements: Edit Profile Modal//
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#edit-profile-form");

// Elements: Add Card Modal//
const addNewCardButton = document.querySelector(".profile__add-button");
const cardForm = document.querySelector("#add-card-form");

//Elements: Image Preview Modal//
const imagePreviewModal = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});

// Elements: Delete Card Preview Modal//
let currentCard;

//Elements: Form Validators//
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, cardForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, avatarForm);
avatarFormValidator.enableValidation();

const toggleAddButtonState = () => addFormValidator.toggleButtonState();

///////////////////////////////////////////////////////////////////////////
//       Initialize Classses & Modals       //////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Initialize API //
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c58369c4-dcd4-4208-8726-c10df21880b5",
    "Content-Type": "application/json",
  },
});

// Initialize User Info //
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// Intialize Section //
const section = new Section(
  {
    items: [],
    renderer: (cardData) => {
      //
      const cardElement = createCard(cardData);
      //
      section.addItem(cardElement);
    },
  },
  ".cards"
);

console.log("Section instance:", section);

// Fetch and Render Initial Data//
api
  .getAllData()
  .then(({ user, cards }) => {
    console.log("Initial user data:", user);
    console.log("Initial cards data:", cards);
    userInfo.setUserInfo(user);
    section.renderItems(cards);
  })
  .catch((error) => console.error("Error loading data", error));

const editAvatarModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: (data) => {
    const userAvatar = {
      avatar: data.avatar,
    };
    api
      .updateUserAvatar(userAvatar)
      .then((updatedUserInfo) => {
        userInfo.setUserInfo(updatedUserInfo);
        editAvatarModal.close();
        avatarFormValidator.toggleButtonState();
      })
      .catch((error) => console.error("Error updating user avatar:", error));
  },
});

const editProfileModal = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    const userData = {
      name: data.name,
      about: data.about,
    };
    editProfileModal.renderLoading(true);
    api
      .updateUserInfo(userData)
      .then((updatedUserInfo) => {
        userInfo.setUserInfo(updatedUserInfo);
        editProfileModal.close();
      })
      .catch((error) => console.error("Error updating user info:", error))
      .finally(() => {
        editProfileModal.renderLoading(false);
      });
  },
});

const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    const cardData = {
      name: data.title,
      link: data.url,
    };

    addCardModal.renderLoading(true);
    api
      .addCard(cardData)
      .then((newCard) => {
        const cardElement = createCard(newCard);
        section.addItem(cardElement);
        cardForm.reset();
        toggleAddButtonState();
        addCardModal.close();
      })
      .catch((error) => console.error("Error adding new card:", error))
      .finally(() => {
        addCardModal.renderLoading(false);
      });
  },
});

const deleteCardModal = new PopupWithConfirm({
  popupSelector: "#delete-card-modal",
  handleConfirm: () => {
    console.log("Current card in handleConfirm:", currentCard);
    if (currentCard) {
      return handleDeleteCard(currentCard);
    }
    // console.warn("No card to delete");
    return Promise.resolve();
  },
});

///////////////////////////////////////////////////////////////////
//       Event Handlers       /////////////////////////////////////
///////////////////////////////////////////////////////////////////

//Function: Render Card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    () => handleImageClick(cardData.name, cardData.link),
    () => handleDeleteClick(card),
    handleLikeClick
  );
  const cardElement = card.getView();
  console.log("Created card element:", cardElement);
  return cardElement;
}

// Function: Delete Card
function handleDeleteCard(card) {
  const cardId = card._id;
  return api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((error) => console.error("Error deleting card:", error));
}

// Function: Open delete confirmation
function handleDeleteClick(card) {
  currentCard = card;
  deleteCardModal.open();
}

// Function: Like/Dislike Card
function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    return api.unlikeCard(cardId);
  } else {
    return api.likeCard(cardId);
  }
}

// Function: Open Preview Image
function handleImageClick(name, link) {
  imagePreviewModal.open({ name, link });
}

// Functon: Open Profile Modal
function handleProfileEditButton() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  editProfileModal.open();
}

//Function: Open Avatar-Edit Modal
function handleAvatarEditButton() {
  const avatarData = userInfo.getUserInfo();
  avatarImage.value = avatarData.avatar;
  editAvatarModal.open();
}

//////////////////////////////////////////////////////////
//       Event Listeners       //////////////////////////
////////////////////////////////////////////////////////

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
imagePreviewModal.setEventListeners();
deleteCardModal.setEventListeners();
editAvatarModal.setEventListeners();

profileEditButton.addEventListener("click", handleProfileEditButton);
addNewCardButton.addEventListener("click", () => addCardModal.open());
avatarImage.addEventListener("click", handleAvatarEditButton);
