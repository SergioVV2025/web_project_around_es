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

function getCardElement(
  name = "Sin Título",
  link = "./images/placeholder.jpg"
) {
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

  newCardForm.reset();
  closeModal(newCardPopup);
}
