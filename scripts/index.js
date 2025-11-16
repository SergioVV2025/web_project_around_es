initialCards = [
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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

/*---------- Create Card ----------*/

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener("click", function () {
    const imagePopup = document.querySelector("#image-popup");
    openModal(imagePopup);

    const popupImage = imagePopup.querySelector(".popup__image");
    popupImage.src = link;
    popupImage.alt = name;

    const popupCaption = imagePopup.querySelector(".popup__caption");
    popupCaption.textContent = name;

    const imagePopupClose = imagePopup.querySelector(".popup__close");
    imagePopupClose.addEventListener("click", function () {
      closeModal(imagePopup);
    });
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButton.closest(".card").remove();
  });

  return cardElement;
}

/*---------- Initial Cards ----------*/

const cardsList = document.querySelector(".cards__list");

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});

function renderCard(name, link, cardContainer) {
  cardContainer.append(getCardElement(name, link));
}

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

  let nameInput = newCardForm.querySelector(
    ".popup__input_type_card-name"
  ).value;
  let linkInput = newCardForm.querySelector(".popup__input_type_url").value;

  const newCard = getCardElement(nameInput, linkInput);
  cardsList.prepend(newCard);

  /*--- Deshabilitar botón "Crear" y limpiar formulario ---*/
  const newCardSubmitButton = newCardForm.querySelector(".popup__button");
  newCardSubmitButton.disabled = true;
  newCardForm.reset();

  closeModal(newCardPopup);
}

/*---------- Validar Campos Profile----------*/

const profileForm = document.forms["edit-profile-form"];
const profileInputs = profileForm.querySelectorAll(".popup__input");
const profileSubmitButton = profileForm.querySelector(".popup__button");

const showProfileInputError = (inputElement, errorMessage) => {
  const errorElement = profileForm.querySelector(
    `.popup__error_${inputElement.name}`
  );
  inputElement.classList.add("popup__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
};

const hideProfileInputError = (inputElement) => {
  const errorElement = profileForm.querySelector(
    `.popup__error_${inputElement.name}`
  );
  inputElement.classList.remove("popup__input_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_active");
};

function toggleProfileButtonState() {
  const allValid = [...profileInputs].every((input) => input.validity.valid);
  profileSubmitButton.disabled = !allValid;
}

profileInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      showProfileInputError(input, input.validationMessage);
    } else {
      hideProfileInputError(input);
    }
    toggleProfileButtonState();
  });
});

/*---------- Validar Campos Card ----------*/

const cardForm = document.forms["new-card-form"];
const cardInputs = cardForm.querySelectorAll(".popup__input");
const cardSubmitButton = cardForm.querySelector(".popup__button");

const showCardInputError = (inputElement, errorMessage) => {
  const errorElement = cardForm.querySelector(
    `.popup__error_${inputElement.name}`
  );
  inputElement.classList.add("popup__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
};

const hideCardInputError = (inputElement) => {
  const errorElement = cardForm.querySelector(
    `.popup__error_${inputElement.name}`
  );
  inputElement.classList.remove("popup__input_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_active");
};

function toggleCardButtonState() {
  const allValid = Array.from(cardInputs).every(
    (input) => input.validity.valid
  );
  cardSubmitButton.disabled = !allValid;
}

cardInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      showCardInputError(input, input.validationMessage);
    } else {
      hideCardInputError(input);
    }
    toggleCardButtonState();
  });
});

/* Si se cierra el formulario cuando está marcando errores, los quitamos */

/*---------- Edit Profile ---------*/

function cleanInputsEditProfile() {
  const errorNameOutput = document.querySelector(".popup__error_name");
  errorNameOutput.classList.remove("popup__error_active");
  const errorDescriptionOutput = document.querySelector(
    ".popup__error_description"
  );
  errorDescriptionOutput.classList.remove("popup__error_active");
  const popupInputName = document.querySelector(".popup__input_type_name");
  popupInputName.classList.remove("popup__input_error");
  const popupInputDescription = document.querySelector(
    ".popup__input_type_description"
  );
  popupInputDescription.classList.remove("popup__input_error");
}

/*---------- New Card ----------*/

function cleanInputsNewCard() {
  const errorPlaceOutput = document.querySelector(".popup__error_place-name");
  errorPlaceOutput.classList.remove("popup__error_active");
  const errorLinkOutput = document.querySelector(".popup__error_link");
  errorLinkOutput.classList.remove("popup__error_active");
  const popupInputPlace = document.querySelector(
    ".popup__input_type_card-name"
  );
  popupInputPlace.classList.remove("popup__input_error");
  const popupInputLink = document.querySelector(".popup__input_type_url");
  popupInputLink.classList.remove("popup__input_error");

  cardForm["place-name"].value = "";
  cardForm["link"].value = "";
}

/*--------------------------------------------------------------*/

/*---------- Overlay ClosePopup ----------*/

editPopup.addEventListener("click", closePopupOnOverlay);
newCardPopup.addEventListener("click", closePopupOnOverlay);

function closePopupOnOverlay(event) {
  if (event.target.id === "edit-popup") {
    cleanInputsEditProfile();
    closeModal(editPopup);
  } else if (event.target.id === "new-card-popup") {
    cleanInputsNewCard();
    closeModal(newCardPopup);
  }
}

/*---------- Esc ClosePopUp ----------*/

document.addEventListener("keydown", closeOnEscKey);

function closeOnEscKey(event) {
  if (event.key === "Escape") {
    if (editPopup.classList.contains("popup_is-opened")) {
      cleanInputsEditProfile();
      closeModal(editPopup);
    } else if (newCardPopup.classList.contains("popup_is-opened")) {
      cleanInputsNewCard();
      closeModal(newCardPopup);
    }
  }
}
