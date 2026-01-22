import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

/*---------- Instancias de Popups ----------*/

const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);

/*---------- Función callback para manejar el click en la imagen de la tarjeta ----------*/

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

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

/*---------- Initial Cards ----------*/

function renderCard(item) {
  const newCard = new Card(item, "#card-template", handleCardClick);
  const cardElement = newCard.generateCard();

  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list",
);

section.renderItems();

/*---------- Edit Profile ---------*/

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  const editProfileForm = document.querySelector("#edit-profile-form");

  editProfileForm.querySelector(".popup__input_type_name").value =
    userData.title;
  editProfileForm.querySelector(".popup__input_type_description").value =
    userData.description;

  editPopup.open();
});

const saveProfileForm = document.querySelector("#edit-profile-form");
function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({
    title: formData.name,
    description: formData.description,
  });

  /*----- Deshabilitar botón "Guardar" -----*/
  const profileSubmitButton = saveProfileForm.querySelector(".popup__button");
  profileSubmitButton.disabled = true;

  editPopup.close();
}

/*---------- Popup Add Card ----------*/

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => {
  console.log("Agregar una nueva tarjeta");
  newCardPopup.open();
});

const saveCardForm = document.querySelector("#new-card-form");
function handleCardFormSubmit(formData) {
  const card = new Card(
    {
      name: formData["place-name"],
      link: formData.link,
    },
    "#card-template",
    handleCardClick,
  );
  const cardElement = card.generateCard();
  section.addItem(cardElement);

  /*--- Deshabilitar botón "Crear" y limpiar formulario ---*/

  const newCardSubmitButton = saveCardForm.querySelector(".popup__button");
  newCardSubmitButton.disabled = true;
  saveCardForm.reset();

  newCardPopup.close();
}

//*---------- Objeto config para validación ----------*/

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
  document.querySelector("#edit-profile-form"),
);
const cardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form"),
);

// Habilitar validación

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
