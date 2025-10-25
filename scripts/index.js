initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// initialCards.forEach(function (card) {
//   console.log(card.name + " | " + card.link);
// });

const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const popupClose = editPopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

profileEditButton.addEventListener("click", function () {
  handleOpenEditModal();
});

popupClose.addEventListener("click", function () {
  closeModal(editPopup);
});

function handleOpenEditModal() {
  openModal(editPopup);
  fillProfileForm();
}

function fillProfileForm() {
  const editProfileForm = document.querySelector("#edit-profile-form");
  const profileTitle = document.querySelector(".profile__title").textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  editProfileForm.querySelector(".popup__input_type_name").value = profileTitle;
  editProfileForm.querySelector(".popup__input_type_description").value =
    profileDescription;
}

let formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".popup__input_type_name").value;
  let jobInput = formElement.querySelector(
    ".popup__input_type_description"
  ).value;

  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
  closeModal(editPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
