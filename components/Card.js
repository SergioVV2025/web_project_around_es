class Card {
  constructor(data, cardSelector, handleCardClick, api, confirmationPop) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._api = api;
    this._confirmation = confirmationPop;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._isLiked = data.isLiked;
  }

  _like() {
    this._isLiked = !this._isLiked;
    if (this._isLiked) {
      this._api
        .likeCard(this._id)
        .then((card) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .unLikeCard(this._id)
        .then((card) => {})
        .catch((err) => {
          console.log(err);
        });
    }
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
      this._like();
    });

    const cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button",
    );
    cardDeleteButton.addEventListener("click", () => {
      this._confirmation.open(this._id, cardDeleteButton);
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
