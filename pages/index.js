import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

/*---------- Instancias de Popups ----------*/

const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
const newConfirmationPopup = new PopupWithConfirmation(
  "#confirmation-popup",
  handleConfirmationSubmit,
);
const newAvatarPopup = new PopupWithForm(
  "#new-avatar-popup",
  handleAvatarFormSubmit,
);

const api = new Api("https://around-api.es.tripleten-services.com/v1/", {
  authorization: "a01c810e-806c-4fd1-8fbf-50de3b00a90f",
  contentType: "application/json",
});

/*---------- Función callback para manejar el click en la imagen de la tarjeta ----------*/

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

/*---------- Initial Profile ----------*/

api
  .getUserInfo()
  .then((userInfo) => {
    const image = document.querySelector(".profile__image");
    image.src = userInfo.avatar;
    image.alt = "Avatar";
    const title = document.querySelector(".profile__title");
    title.textContent = userInfo.name;
    const description = document.querySelector(".profile__description");
    description.textContent = userInfo.about;
  })
  .catch((err) => {
    console.log(err);
  });

/*---------- Initial Cards ----------*/

let section;

function renderCard(item) {
  const newCard = new Card(
    item,
    "#card-template",
    handleCardClick,
    api,
    newConfirmationPopup,
  );
  const cardElement = newCard.generateCard();

  return cardElement;
}

api
  .getInitialCards()
  .then((initialCards) => {
    section = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".cards__list",
    );

    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/*---------- Edit Profile ---------*/

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function () {
  api
    .getUserInfo()
    .then((userInfo) => {
      const editProfileForm = document.querySelector("#edit-profile-form");
      editProfileForm.querySelector(".popup__input_type_name").value =
        userInfo.name;
      editProfileForm.querySelector(".popup__input_type_description").value =
        userInfo.about;

      editPopup.open();
    })
    .catch((err) => {
      console.log(err);
    });
});

const saveProfileForm = document.querySelector("#edit-profile-form");
function handleProfileFormSubmit(formData) {
  api
    .setUserInfo(formData.name, formData.description)
    .then((userInfo) => {
      const title = document.querySelector(".profile__title");
      title.textContent = userInfo.name;
      const description = document.querySelector(".profile__description");
      description.textContent = userInfo.about;
    })
    .catch((err) => {
      console.log(err);
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
  const newCardSubmitButton = saveCardForm.querySelector(".popup__button");
  newCardSubmitButton.textContent = "Creando...";
  api
    .addCard(formData["place-name"], formData.link)
    .then((card) => {
      section.addItem(card);
      newCardSubmitButton.disabled = true;
      newCardSubmitButton.textContent = "Crear";
      saveCardForm.reset();

      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
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
const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-avatar-form"),
);

// Habilitar validación

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/*---------- Delete Card Confirmation ----------*/

function handleConfirmationSubmit(id, cardDeleteButton) {
  api
    .deleteCard(id)
    .then((resultado) => {
      cardDeleteButton.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

/*---------- Edit Avatar ----------*/

const avatarEdit = document.querySelector(".profile__container");
avatarEdit.addEventListener("click", () => {
  newAvatarPopup.open();
});

function handleAvatarFormSubmit(formData) {
  api
    .setAvatar(formData.link)
    .then((userInfo) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.src = userInfo.avatar;
      profileImage.alt = "Avatar";
      newAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}
