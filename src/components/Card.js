class Card {
  constructor(data, templateSelector, handleCardClick) {
    console.log("Card constructor received data:", data);
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate
      .querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  _fillCardInfo(cardElement) {
    const cardImage = cardElement.querySelector(".elements__image");
    const cardTitle = cardElement.querySelector(".elements__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
  }
  _setEventListeners(cardElement) {
    const cardImage = cardElement.querySelector(".elements__image");
    const likeButton = cardElement.querySelector(".elements__like-button");
    const deleteButton = cardElement.querySelector(".elements__delete-button");

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
    likeButton.addEventListener("click", (evt) => this._handleLikeClick(evt));
    deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(cardElement)
    );
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("elements__like-button_active");
  }

  _handleDeleteClick(cardElement) {
    cardElement.remove();
  }

  generateCard() {
    const cardElement = this._getTemplate();
    this._fillCardInfo(cardElement);
    this._setEventListeners(cardElement);
    return cardElement;
  }
}

export default Card;
