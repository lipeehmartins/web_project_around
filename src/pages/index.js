import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";

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

// ===== SELETORES =====
const elementsContainer = document.querySelector(".elements__container");
const editbtn = document.querySelector(".edit-btn");
const closebtn = document.querySelector(".popup__close-button");
const postbtn = document.querySelector(".post-btn");
const closeNewPostbtn = document.querySelector(".closeNewPostbtn");
const form = document.querySelector(".popup__form");
const newPostForm = document.querySelector(".popup__form_new-post");
const closeImageBtn = document.querySelector(".closeimagebtn");

// ===== CONFIGURAÇÃO DA VALIDAÇÃO =====
const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// ===== INSTÂNCIAS DAS CLASSES =====

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(".popup__image");

// Criar validadores
const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__edit-profile .form")
);

const newPostValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__edit-newPost .form")
);

const editProfilePopup = new PopupWithForm(
  ".popup__edit-profile",
  (formData) => {
    userInfo.setUserInfo(formData);
    editProfilePopup.close();
  }
);

const newPostPopup = new PopupWithForm(".popup__edit-newPost", (formData) => {
  console.log("Creating new card with data:", formData);
  const newCard = new Card(formData, "#elements-template", (link, name) => {
    imagePopup.open({ imageSrc: link, imageTitle: name });
  });
  cardSection.addItem(newCard.generateCard());
  newPostPopup.close();
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#elements-template", (link, name) => {
        imagePopup.open({ imageSrc: link, imageTitle: name });
      });
      return card.generateCard();
    },
  },
  ".elements__container"
);

// ===== INICIALIZAÇÃO =====

// Configurar event listeners dos popups
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newPostPopup.setEventListeners();

// Inicializar validação
editProfileValidator.enableValidation();
newPostValidator.enableValidation();

// Event listeners dos botões
editbtn.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  document.querySelector(".popup__input_name").value = currentInfo.name;
  document.querySelector(".popup__input_sobre_mim").value =
    currentInfo.description;
  editProfileValidator.resetFormValidation();
  editProfilePopup.open();
});

postbtn.addEventListener("click", () => {
  newPostValidator.resetFormValidation();
  newPostPopup.open();
});

// Renderizar cards iniciais
cardSection.renderItems();
