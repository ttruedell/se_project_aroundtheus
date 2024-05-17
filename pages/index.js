import Card from "../components/Card.js";

////Constants//////
const initialCards = [
  {
    name: "Yosmite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const card = new Card(initialCards, cardTemplate);

//Elements: Edit Profile Modal//
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = editProfileModal.querySelector("#edit-profile-form");

// Elements: Add Card Modal
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const cardsElement = document.querySelector(".cards");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

const cardForm = addCardModal.querySelector("#add-card-form");
const cardTitleInput = cardForm.querySelector(".modal__input_type_title");
const cardUrlInput = cardForm.querySelector(".modal__input_type_url");

//Elements: Image Preview Modal
const imagePreviewModal = document.querySelector("#image-preview-modal");
const previewImage = imagePreviewModal.querySelector(".modal__preview-image");
const imagePreviewModalCloseButton = imagePreviewModal.querySelector(
  ".modal__preview-close"
);
const imagePreviewModalTitle = imagePreviewModal.querySelector(
  ".modal__preview-title"
);

///Element, select modals
const modalElements = document.querySelectorAll(".modal");

//Functions//
function openModal(modal) {
  modal.classList.add("modal_opened");
  addEscKeyListener();
  addClickOutsideModalListener();
}

function closeModal(modal) {
  modal.classList.add("modal_hide");
  setTimeout(() => {
    modal.classList.remove("modal_opened");
    modal.classList.remove("modal_hide");
  }, 200);
  removeEscKeyListener();
  removeClickOutsideModalListener();
}

////////Functions: Close Modal, Press Esc (Start)
function handleEscKey(event) {
  modalElements.forEach(function (modal) {
    if (event.key === "Escape" && modal.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
}
function addEscKeyListener() {
  document.addEventListener("keydown", handleEscKey);
}

function removeEscKeyListener() {
  document.removeEventListener("keydown", handleEscKey);
}
////////Functions: Close Modal, Press Esc (End)

///////Functions: Close Modal, Click Outside (Start)
function isClickOutsideModalContainer(event, modal) {
  const modalContainer = modal.querySelector(".modal__js-container");
  const modalRect = modalContainer.getBoundingClientRect();
  const clickX = event.clientX;
  const clickY = event.clientY;

  return (
    clickX < modalRect.left ||
    clickX > modalRect.right ||
    clickY < modalRect.top ||
    clickY > modalRect.bottom
  );
}
function handleClickOutsideModal(event) {
  modalElements.forEach(function (modal) {
    if (
      isClickOutsideModalContainer(event, modal) &&
      modal.classList.contains("modal_opened")
    ) {
      closeModal(modal);
    }
  });
}

function addClickOutsideModalListener() {
  document.addEventListener("mousedown", handleClickOutsideModal);
}

function removeClickOutsideModalListener() {
  document.removeEventListener("mousedown", handleClickOutsideModal);
}

///////Functions: Close Modal, Click Outside (End)
//

//Function: Render Card
function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// Function: getCardElement (Start)
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTextElement = cardElement.querySelector(".card__text");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    imagePreviewModalTitle.textContent = cardData.name;
    openModal(imagePreviewModal);
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTextElement.textContent = cardData.name;
  return cardElement;
} // Function getCardElement (End)

//Event Handlers//

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsElement);
  cardForm.reset();
  closeModal(addCardModal);
}

/////

//Event Listeners//
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardForm.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

imagePreviewModalCloseButton.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsElement));