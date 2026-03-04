import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(id, cardDeleteButton) {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._id = id;
    this._cardDeleteButton = cardDeleteButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._id, this._cardDeleteButton);
        super.close();
      });
  }
}

export default PopupWithConfirmation;
