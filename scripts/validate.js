const getErrorMessage = (inputElement) => {
  const validity = inputElement.validity;

  if (validity.valueMissing) {
    return "Preencha esse campo.";
  }

  if (validity.tooShort) {
    const minLength = inputElement.getAttribute("minlength");
    return `O texto deve ter pelo menos ${minLength} caracteres.`;
  }

  if (validity.tooLong) {
    const maxLength = inputElement.getAttribute("maxlength");
    return `O texto deve ter no máximo ${maxLength} caracteres.`;
  }

  if (validity.typeMismatch) {
    if (inputElement.type === "url") {
      return "Insira um endereço web válido.";
    }
  }

  if (validity.patternMismatch) {
    return "O formato inserido não corresponde ao formato solicitado.";
  }

  return "Valor inválido.";
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    const customErrorMessage = getErrorMessage(inputElement);
    showInputError(formElement, inputElement, customErrorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit-button_inactive");
  } else {
    buttonElement.classList.remove("form__submit-button_inactive");
  }
};

const resetFormValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.value = "";
  });

  buttonElement.classList.add("form__submit-button_inactive");
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });

    inputElement.addEventListener("blur", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));

    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement);
    });
  });
};

enableValidation();
