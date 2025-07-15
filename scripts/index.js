let content = document.querySelector(".content");
const editbtn = document.querySelector(".edit-btn");
const closebtn = document.querySelector(".popup__close-button");
const savebtn = document.querySelector(".popup__save-button");
const form = document.querySelector(".popup__form");

function togglePopup() {
  let popup = document.querySelector(".popup__edit-profile");
  popup.classList.toggle("popup__opened");
}

editbtn.addEventListener("click", togglePopup);

closebtn.addEventListener("click", togglePopup);

function saveChanges(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__input_name");
  let sobreMimInput = document.querySelector(".popup__input_sobre_mim");
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
