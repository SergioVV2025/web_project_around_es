class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    const cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_is-active");
    });

    const cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button",
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
