class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleOpenModal(modal) {
    modal.classList.add("popup_is-opened");
  }

  _handleCloseModal(modal) {
    modal.classList.remove("popup_is-opened");
  }

  _setEventListeners() {
    const imagePopup = document.querySelector("#image-popup");

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleOpenModal(imagePopup);

      const popupImage = imagePopup.querySelector(".popup__image");
      popupImage.src = this._link;
      popupImage.alt = this._name;

      const popupCaption = imagePopup.querySelector(".popup__caption");
      popupCaption.textContent = this._name;
    });

    const imagePopupClose = imagePopup.querySelector(".popup__close");
    imagePopupClose.addEventListener("click", () => {
      this._handleCloseModal(imagePopup);
    });

    const cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_is-active");
    });

    const cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    cardDeleteButton.addEventListener("click", () => {
      cardDeleteButton.closest(".card").remove();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
