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

function togglePopup() {
  let popup = document.querySelector(".popup__edit-profile");
  popup.classList.toggle("popup__opened");
}

editbtn.addEventListener("click", togglePopup);

closebtn.addEventListener("click", togglePopup);

function saveChanges(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_name");
  const sobreMimInput = document.querySelector(".popup__input_sobre_mim");
  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = sobreMimInput.value;

  if (nameInput.value === "" || sobreMimInput.value === "") {
    alert("Preencha todos os campos!");
    return;
  }
  nameInput.value = "";
  sobreMimInput.value = "";

  togglePopup();
}

form.addEventListener("submit", saveChanges);

function openNewPostPopup() {
  let popupNewPost = document.querySelector(".popup__edit-newPost");
  popupNewPost.classList.toggle("newPostpopup__opened");
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
  cardImage.alt = `Imagem de ${name}`;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like-button_active");
  });
  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".elements__item").remove();
  });

  elementsContainer.append(cardElement);
}

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_local");
  const linkInput = document.querySelector(".popup__input_link_imagem");

  if (nameInput.value === "" || linkInput.value === "") {
    alert("Preencha todos os campos!");
    return;
  }

  createCard(nameInput.value, linkInput.value);

  nameInput.value = "";
  linkInput.value = "";
  openNewPostPopup();
});

// Render initial cards
initialCards.forEach((card) => {
  createCard(card.name, card.link);
});
