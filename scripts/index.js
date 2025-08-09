const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const content = document.querySelector(".content");
const elementsContainer = content.querySelector(".elements__container");
const editbtn = document.querySelector(".edit-btn");
const closebtn = document.querySelector(".popup__close-button");
const postbtn = document.querySelector(".post-btn");
const closeNewPostbtn = document.querySelector(".closeNewPostbtn");
const form = document.querySelector(".popup__form");
const newPostForm = document.querySelector(".popup__form_new-post");
const imagePopup = document.querySelector(".popup__image");
const closeImageBtn = document.querySelector(".closeImagebtn");
const popupImage = document.querySelector(".popup__image-content");
const popupImageTitle = document.querySelector(".popup__image-title");

function togglePopup() {
  const popup = document.querySelector(".popup__edit-profile");
  popup.classList.toggle("popup__opened");

  if (!popup.classList.contains("popup__opened")) {
    const formElement = popup.querySelector(".form");
    resetFormValidation(formElement);
  }
}

editbtn.addEventListener("click", togglePopup);
closebtn.addEventListener("click", togglePopup);

function saveChanges(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_name");
  const sobreMimInput = document.querySelector(".popup__input_sobre_mim");
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = sobreMimInput.value;

  togglePopup();
}

form.addEventListener("submit", saveChanges);

function openNewPostPopup() {
  const popupNewPost = document.querySelector(".popup__edit-newPost");
  popupNewPost.classList.toggle("newPostpopup__opened");

  if (!popupNewPost.classList.contains("newPostpopup__opened")) {
    const formElement = popupNewPost.querySelector(".form");
    resetFormValidation(formElement);
  }
}

postbtn.addEventListener("click", openNewPostPopup);
closeNewPostbtn.addEventListener("click", openNewPostPopup);

function createCard(name, link) {
  const cardTemplate = document.querySelector("#elements-template").content;
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  const likeButton = cardElement.querySelector(".elements__like-button");
  const deleteButton = cardElement.querySelector(".elements__delete-button");

  cardImage.src = link;
  cardImage.alt = `${name}`;
  cardTitle.textContent = name;

  cardImage.addEventListener("click", function () {
    openImagePopup(link, name);
  });

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like-button_active");
  });
  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".elements__item").remove();
  });

  elementsContainer.prepend(cardElement);
}

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_local");
  const linkInput = document.querySelector(".popup__input_link_imagem");

  createCard(nameInput.value, linkInput.value);

  openNewPostPopup();
});

initialCards.forEach((card) => {
  createCard(card.name, card.link);
});

function openImagePopup(imageSrc, imageTitle) {
  popupImage.src = imageSrc;
  popupImage.alt = imageTitle;
  popupImageTitle.textContent = imageTitle;

  document.body.style.overflow = "hidden";
  imagePopup.classList.add("popup__opened");
}

function closeImagePopup() {
  imagePopup.classList.remove("popup__opened");
  document.body.style.overflow = "auto";
}

closeImageBtn.addEventListener("click", closeImagePopup);

function closePopupOutClick(evt) {
  if (evt.target.classList.contains("popup__edit-profile")) {
    togglePopup();
  } else if (evt.target.classList.contains("popup__edit-newPost")) {
    openNewPostPopup();
  } else if (evt.target.classList.contains("popup__image")) {
    closeImagePopup();
  }
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const editProfilePopup = document.querySelector(".popup__edit-profile");
    const newPostPopup = document.querySelector(".popup__edit-newPost");
    const imagePopup = document.querySelector(".popup__image");

    if (editProfilePopup.classList.contains("popup__opened")) {
      togglePopup();
    } else if (newPostPopup.classList.contains("newPostpopup__opened")) {
      openNewPostPopup();
    } else if (imagePopup.classList.contains("popup__opened")) {
      closeImagePopup();
    }
  }
}

document.addEventListener("click", closePopupOutClick);
document.addEventListener("keydown", closePopupEsc);
