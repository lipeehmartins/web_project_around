import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// ===== CONFIGURAÇÃO DA API =====

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "b0595a08-5a42-471a-9cc4-ba55f5632e61",
    "Content-Type": "application/json",
  },
});

// ==== ARMAZENAMENTO DE CARDS =====

const cardInstances = new Map();
let userId = null;

// ===== SELETORES =====
const editbtn = document.querySelector(".edit-btn");
const postbtn = document.querySelector(".post-btn");

// ===== CONFIGURAÇÃO DA VALIDAÇÃO =====
const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// ===== FUNÇÕES AUXILIARES =====

function renderLoading(
  isLoading,
  button,
  originalText = "Salvar",
  loadingText = "Salvando..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = originalText;
  }
}

// ===== INSTÂNCIAS DAS CLASSES =====

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(".popup__image");

// Criar validadores
const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__edit-profile .popup__form")
);

const newPostValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__edit-newPost .popup__form")
);

const avatarValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup_type_avatar .popup__form")
);

// Criar popups de formulários

const editProfilePopup = new PopupWithForm(
  ".popup__edit-profile",
  (formData) => {
    const submitButton = document.querySelector(
      ".popup__edit-profile .popup__save-button"
    );
    renderLoading(true, submitButton);
    api
      .updateProfile(formData.name, formData.description)
      .then((userData) => {
        userInfo.setUserInfo(formData);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, submitButton);
      });
  }
);

const newPostPopup = new PopupWithForm(".popup__edit-newPost", (formData) => {
  const submitButton = document.querySelector(
    ".popup__edit-newPost .popup__save-button"
  );
  renderLoading(true, submitButton, "Criar", "Salvando...");

  api
    .addCard(formData.name, formData.link)
    .then((newCardData) => {
      const newCard = new Card(
        newCardData,
        "#elements-template",
        (link, name) => {
          imagePopup.open({ imageSrc: link, imageTitle: name });
        },
        handleDeleteCard,
        handleLikeCard,
        userId
      );
      cardInstances.set(newCardData._id, newCard);
      cardSection.addItem(newCard.generateCard());
      newPostPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Criar");
    });
});

const avatarPopup = new PopupWithForm(".popup_type_avatar", (formData) => {
  const submitButton = document.querySelector(
    ".popup_type_avatar .popup__save-button"
  );
  renderLoading(true, submitButton);

  api
    .updateAvatar(formData.avatar)
    .then((userData) => {
      const profileAvatar = document.querySelector(".profile__image");
      profileAvatar.src = userData.avatar;
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#elements-template",
        (link, name) => imagePopup.open({ imageSrc: link, imageTitle: name }),
        handleDeleteCard,
        handleLikeCard,
        userId
      );
      cardInstances.set(cardData._id, card);
      return card.generateCard();
    },
  },
  ".elements__container"
);

const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");

// ===== FUNÇÕES DE MANIPULAÇÃO =====

function handleDeleteCard(cardId) {
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        const cardToDelete = cardInstances.get(cardId);
        if (cardToDelete) {
          cardToDelete.deleteCard();
          cardInstances.delete(cardId);
        }
        confirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  confirmPopup.open();
}

function handleLikeCard(cardId, isLiked) {
  if (isLiked) {
    api
      .removeLike(cardId)
      .then((cardData) => {
        const card = cardInstances.get(cardId);
        if (card) {
          card.updateLikeState(cardData.isLiked);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(cardId)
      .then((cardData) => {
        const card = cardInstances.get(cardId);
        if (card) {
          card.updateLikeState(cardData.isLiked);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Configurar event listeners dos popups
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newPostPopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

// Inicializar validação
editProfileValidator.enableValidation();
newPostValidator.enableValidation();
avatarValidator.enableValidation();

// Event listeners dos botões
editbtn.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  document.querySelector(".popup__input_name").value = currentInfo.name;
  document.querySelector(".popup__input_about_me").value =
    currentInfo.description;
  editProfileValidator.resetFormValidation();
  editProfilePopup.open();
});

postbtn.addEventListener("click", () => {
  newPostValidator.resetFormValidation();
  newPostPopup.open();
});

document
  .querySelector(".profile__photo-edit-button")
  .addEventListener("click", () => {
    avatarValidator.resetFormValidation();
    avatarPopup.open();
  });

// Renderizar cards iniciais
api
  .getAppInfo()
  .then(([userData, initialCards]) => {
    userId = userData._id;
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");
    const profileAvatar = document.querySelector(".profile__image");

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    initialCards.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#elements-template",
        (link, name) => {
          imagePopup.open({ imageSrc: link, imageTitle: name });
        },
        handleDeleteCard,
        handleLikeCard,
        userId
      );
      cardInstances.set(cardData._id, card);
      cardSection.addItem(card.generateCard());
    });
  })
  .catch((err) => {
    console.log(err);
  });
