import "../pages/index.css";
import avatarSrc from "../images/Avatar.png";
import editAvatarSrc from "../images/edit-avatar-vector.svg";

const avatarImage = document.getElementById("Avatar-image");
avatarImage.src = avatarSrc;

const editVector = document.getElementById("Avatar-edit-vector");
editVector.src = editAvatarSrc;

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards, settings } from "../utils/constants.js";

import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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

// Elements: Delete Card Preview Modal

const deleteCardModal = new PopupWithConfirm({
  popupSelector: "#delete-card-modal",
  handleConfirm: () => {
    if (currentCard) {
      handleDeleteCard(currentCard);
      deleteCardModal.close(); // Close modal after handling deletion
    }
  },
});

let currentCard;

//Elements: Form Validators
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, cardForm);
addFormValidator.enableValidation();

const toggleAddButtonState = () => addFormValidator.toggleButtonState();

//Initialize Modals

// const editAvatarModal = new PopupWithForm({
//   popupSelector: "#edit-avatar-modal",
//   handleFormSubmit: () => {},
// });

const editProfileModal = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  // handleFormSubmit: (data) => {
  //   userInfo.setUserInfo({ name: data.name, job: data.job });
  // },
  handleFormSubmit: (data) => {
    const userData = {
      name: data.name,
      about: data.about,
    };
    api
      .updateUserInfo(userData)
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
    const cardData = {
      name: data.title,
      link: data.url,
    };
    api
      .addCard(cardData)
      .then((newCard) => {
        if (newCard && newCard.name && newCard.link) {
          const cardElement = createCard({
            name: newCard.name,
            link: newCard.link,
            //
            _id: newCard._id,
            //
          });
          section.addItem(cardElement);
          cardForm.reset();
          toggleAddButtonState();
          addCardModal.close();
        } else {
          console.error("Invalid card data:", newCard);
        }
      })
      .catch((error) => console.error("Error adding new card:", error));
  },
});

// Initialize User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// Intialize Section
const section = new Section(
  {
    // items: initialCards,
    items: [],
    renderer: (cardData) => {
      // const cardElement = createCard(cardData);
      section.addItem(cardData);
    },
  },
  ".cards"
);

console.log("Section instance:", section);
// section.renderItems();

// Initialize API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c58369c4-dcd4-4208-8726-c10df21880b5",
    "Content-Type": "application/json",
  },
});

// Fetch and Render Initial Data
api
  .getAllData()
  .then(({ user, cards }) => {
    console.log("Initial user data:", user);
    console.log("Initial cards data:", cards);
    const cardElement = cards.map((cardData) => createCard(cardData));
    section.renderItems(cardElement);
    userInfo.setUserInfo(user);
    // if (cards.length === 0) {
    //   console.log("No cards found on the server. Adding initial cards.");
    //   addInitialCards(initialCards)
    //     .then(() => api.getInitialCards())
    //     .then((newCards) => {
    //       console.log("New cards added from initial cards:", newCards);
    //       section.renderItems(newCards);
    //     });
    // } else {
    //   console.log("Rendering cards from the server:", cards);
    //   section.renderItems(items);
    // }
  })
  .catch((error) => console.error("Error loading data", error));

// function addInitialCards(cards) {
//   const promises = cards.map((cardData) => {
//     console.log("Adding card:", cardData);
//     return api
//       .addCard(cardData)
//       .then((newCard) => {
//         console.log("Adding card:", cardData);
//         // if (newCard && newCard.name && newCard.link) {
//         const cardElement = createCard({
//           name: newCard.name,
//           link: newCard.link,
//           //
//           _id: newCard._id,
//           //
//         });
//         section.addItem(cardElement);
//         // } else {
//         //   console.error("Invalid card data:", newCard);
//         // }
//       })
//       .catch((error) => console.error("Error adding card:", error));
//   });
//   console.log("Checking promies:", promises);
//   return Promise.all(promises);
// }
///

///
// Modal Event Listeners

//

//Function: Render Card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    () => handleImageClick(cardData.name, cardData.link),
    // handleDeleteCard,
    () => handleDeleteClick(card),
    handleLikeClick
  );
  const cardElement = card.getView();
  console.log("Created card element:", cardElement);
  return cardElement;
}

// Function: Delete Card
function handleDeleteCard(card) {
  const cardId = card._id; // Assuming each card has an _id property
  api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
      // section.removeCard(cardId); // Remove card from the section
    })
    .catch((error) => console.error("Error deleting card:", error));
  // .finally(() => {
  //   deleteCardModal._resetButtonState();
  // });
}
// Function to open delete confirmation
function handleDeleteClick(card) {
  currentCard = card; // Set the current card to delete
  deleteCardModal.open(); // Open the confirmation modal
}

// Function: Like/Dislike Card
function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    return api.unlikeCard(cardId);
  } else {
    return api.likeCard(cardId);
  }
}

//Event Handlers//
function handleImageClick(name, link) {
  imagePreviewModal.open({ name, link });
}

// function handleConfirmCardDelete() {
//   handleDeleteCard();
//   deleteCardModal.close();
// }

function handleProfileEditButton() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  editProfileModal.open();
}

//Event Listeners//
editProfileModal.setEventListeners();
addCardModal.setEventListeners();
imagePreviewModal.setEventListeners();

profileEditButton.addEventListener("click", handleProfileEditButton);
addNewCardButton.addEventListener("click", () => addCardModal.open());
avatarImage.addEventListener("click", () => {});
// confirmDeleteCardButton.addEventListener("click", handleConfirmCardDelete);
