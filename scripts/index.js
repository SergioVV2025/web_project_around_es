import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  closePopupOnOverlay,
  closeOnEscKey,
  cleanInputsEditProfile,
  cleanInputsNewCard,
} from "./utils.js";

/*---------- Initial Cards Data ----------*/

let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/*---------- Modals ----------*/

// importadas y usadas en utils.js

/*---------- Create Card ----------*/

// Importada la clase Card al inicio del archivo

/*---------- Initial Cards ----------*/

const cardsList = document.querySelector(".cards__list");

initialCards.forEach((item) => {
  const newCard = new Card(item, "#card-template");
  const cardElement = newCard.generateCard();
  cardsList.append(cardElement);
});

/*---------- Edit Profile ---------*/

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function () {
  handleOpenEditModal();
});

const editPopup = document.querySelector("#edit-popup");
function handleOpenEditModal() {
  openModal(editPopup);
  fillProfileForm();
}

function fillProfileForm() {
  const editProfileForm = editPopup.querySelector("#edit-profile-form");
  const profileTitle = document.querySelector(".profile__title").textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  editProfileForm.querySelector(".popup__input_type_name").value = profileTitle;
  editProfileForm.querySelector(".popup__input_type_description").value =
    profileDescription;
}

const editPopupClose = editPopup.querySelector(".popup__close");
editPopupClose.addEventListener("click", function () {
  cleanInputsEditProfile();
  closeModal(editPopup);
});

const saveProfileForm = document.querySelector("#edit-profile-form");
saveProfileForm.addEventListener("submit", handleProfileFormSubmit);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = saveProfileForm.querySelector(
    ".popup__input_type_name"
  ).value;
  let jobInput = saveProfileForm.querySelector(
    ".popup__input_type_description"
  ).value;

  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;

  /*----- Deshabilitar botón "Guardar" -----*/
  const profileSubmitButton = saveProfileForm.querySelector(".popup__button");
  profileSubmitButton.disabled = true;

  closeModal(editPopup);
}

/*---------- Popup Add Card ----------*/

const newCardPopup = document.querySelector("#new-card-popup");

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

const addPopupClose = newCardPopup.querySelector(".popup__close");
addPopupClose.addEventListener("click", function () {
  cleanInputsNewCard();
  closeModal(newCardPopup);
});

const newCardForm = newCardPopup.querySelector("#new-card-form");
newCardForm.addEventListener("submit", handleCardFormSubmit);
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: newCardForm.querySelector(".popup__input_type_card-name").value,
    link: newCardForm.querySelector(".popup__input_type_url").value,
  };

  const newCard = new Card(cardData, "#card-template");
  const cardElement = newCard.generateCard();
  cardsList.prepend(cardElement);

  /*--- Deshabilitar botón "Crear" y limpiar formulario ---*/
  const newCardSubmitButton = newCardForm.querySelector(".popup__button");
  newCardSubmitButton.disabled = true;
  newCardForm.reset();

  closeModal(newCardPopup);
}

/*---------- Objeto config para validación ----------*/

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};

/*---------- Instanciar validadores ----------*/
const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form")
);
const cardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form")
);

// Habilitar validación
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

/* Si se cierra el formulario cuando está marcando errores, los quitamos */

/*---------- Edit Profile ---------*/

// IMPORTADA y USADA en utils.js

/*--------------------------------------------------------------*/

/*---------- New Card ----------*/

// IMPORTADA y USADA en utils.js

/*--------------------------------------------------------------*/

/*---------- Overlay ClosePopup ----------*/

//IMPORTADA y USADA en utils.js

/*---------- Esc ClosePopUp ----------*/

//importada y usada en utils.js

/*--------------------------------------------------------------*/
