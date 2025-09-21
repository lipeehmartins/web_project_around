import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image-content");
    this._caption = this._popup.querySelector(".popup__image-title");
  }

  open({ imageSrc, imageTitle }) {
    this._image.src = imageSrc;
    this._image.alt = imageTitle;
    this._caption.textContent = imageTitle;
    super.open();
  }
}
