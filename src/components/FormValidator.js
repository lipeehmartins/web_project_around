class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _getErrorMessage(inputElement) {
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
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const customErrorMessage = this._getErrorMessage(inputElement);
      this._showInputError(inputElement, customErrorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  resetFormValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = "";
    });

    buttonElement.classList.add(this._inactiveButtonClass);
  }

  isValid() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return !this._hasInvalidInput(inputList);
  }

  _setEventListeners(fieldsetElement) {
    const inputList = Array.from(
      fieldsetElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = fieldsetElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });

      inputElement.addEventListener("blur", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      if (!this.isValid()) {
        evt.preventDefault();
        return false;
      }
    });

    const fieldsetList = Array.from(
      this._formElement.querySelectorAll(".form__set")
    );

    fieldsetList.forEach((fieldsetElement) => {
      this._setEventListeners(fieldsetElement);
    });
  }
}

export default FormValidator;
