import FormValidator from "../components/FormValidator.js";

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const editProfileForm = document.querySelector(".popup__edit-profile .form");
const newPostForm = document.querySelector(".popup__edit-newPost .form");

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const newPostValidator = new FormValidator(validationConfig, newPostForm);

const editProfilePopup = document.querySelector(".popup__edit-profile");
const newPostPopup = document.querySelector(".popup__edit-newPost");
const imagePopup = document.querySelector(".popup__image");
const popupImage = document.querySelector(".popup__image-content");
const popupImageTitle = document.querySelector(".popup__image-title");

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

function togglePopup() {
  editProfilePopup.classList.toggle("popup__opened");

  if (!editProfilePopup.classList.contains("popup__opened")) {
    editProfileValidator.resetFormValidation();
  }
}

function openNewPostPopup() {
  newPostPopup.classList.toggle("newPostpopup__opened");

  if (!newPostPopup.classList.contains("newPostpopup__opened")) {
    newPostValidator.resetFormValidation();
  }
}

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
    if (editProfilePopup.classList.contains("popup__opened")) {
      togglePopup();
    } else if (newPostPopup.classList.contains("newPostpopup__opened")) {
      openNewPostPopup();
    } else if (imagePopup.classList.contains("popup__opened")) {
      closeImagePopup();
    }
  }
}

export {
  openImagePopup,
  closeImagePopup,
  togglePopup,
  openNewPostPopup,
  closePopupOutClick,
  closePopupEsc,
};
