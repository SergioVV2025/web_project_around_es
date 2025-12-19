const editPopup = document.querySelector("#edit-popup");
editPopup.addEventListener("click", closePopupOnOverlay);

const newCardPopup = document.querySelector("#new-card-popup");
newCardPopup.addEventListener("click", closePopupOnOverlay);

document.addEventListener("keydown", closeOnEscKey);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function closePopupOnOverlay(event) {
  if (event.target.id === "edit-popup") {
    cleanInputsEditProfile();
    closeModal(editPopup);
  } else if (event.target.id === "new-card-popup") {
    cleanInputsNewCard();
    closeModal(newCardPopup);
  }
}

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

function cleanInputsNewCard() {
  const cardForm = document.forms["new-card-form"];
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

export {
  openModal,
  closeModal,
  closePopupOnOverlay,
  closeOnEscKey,
  cleanInputsEditProfile,
  cleanInputsNewCard,
};
