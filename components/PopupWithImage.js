import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }

  // No es necesario sobrescribir setEventListeners si no se añaden nuevos eventos
  // En caso de no llamar this.setEventListeners() en la clase padre, se podría descomentar este método
  // setEventListeners() {
  //   super.setEventListeners();
  // }
}

export default PopupWithImage;
