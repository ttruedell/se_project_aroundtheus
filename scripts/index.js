let initialCards = [
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
//Elements//
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

const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const cardsElement = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardForm = addCardModal.querySelector("#add-card-form");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

//Functions//
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //access the card title and image and store them in variables
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTextElement = cardElement.querySelector(".card__text");
  //set the path to the image to the link field of the object
  cardImageElement.src = cardData.link;
  //set the image alt text to the name field of the object
  cardImageElement.alt = cardData.name;
  //set the card title to the name field of the object, too
  cardTextElement.textContent = cardData.name;
  //return the ready HTML element with the filled-in data
  return cardElement;
}

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
  closeModal(addCardModal);
}

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

addCardForm.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsElement));
