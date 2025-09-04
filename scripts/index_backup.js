import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openImagePopup,
  closeImagePopup,
  togglePopup,
  openNewPostPopup,
  closePopupOutClick,
  closePopupEsc,
} from "./utils.js";

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
const closeImageBtn = document.querySelector(".closeimagebtn");

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});

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

postbtn.addEventListener("click", openNewPostPopup);
closeNewPostbtn.addEventListener("click", openNewPostPopup);

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_local");
  const linkInput = document.querySelector(".popup__input_link_imagem");

  const newCard = new Card(
    { name: nameInput.value, link: linkInput.value },
    "#elements-template",
    openImagePopup
  );
  const cardElement = newCard.generateCard();
  elementsContainer.prepend(cardElement);

  openNewPostPopup();
});

initialCards.forEach((card) => {
  const newCard = new Card(card, "#elements-template", openImagePopup);
  const cardElement = newCard.generateCard();
  elementsContainer.prepend(cardElement);
});

closeImageBtn.addEventListener("click", closeImagePopup);

document.addEventListener("click", closePopupOutClick);
document.addEventListener("keydown", closePopupEsc);
