class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._id = data._id;
    this._owner = data.owner;
    this._onLikeClick = handleLikeClick;
    this._isLiked = data.isLiked;
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
      this._handleDeleteClick(this._id)
    );
  }

  _handleLikeClick() {
    this._onLikeClick(this._id, this._isLiked);
  }

  updateLikeState(isLiked) {
    this._isLiked = isLiked;
    const likeButton = this._element.querySelector(".elements__like-button");
    if (isLiked) {
      likeButton.classList.add("elements__like-button_active");
    } else {
      likeButton.classList.remove("elements__like-button_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillCardInfo(this._element);
    this._setEventListeners(this._element);
    // Verifica se o cartão pertence ao usuário atual
    const ownerId =
      this._owner && this._owner._id ? this._owner._id : this._owner;
    if (ownerId !== this._userId) {
      this._element.querySelector(".elements__delete").style.display = "none";
    }
    this.updateLikeState(this._isLiked);
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
