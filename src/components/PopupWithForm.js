import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".form__submit");
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // Verificar se formulário é válido
      const isValid = Array.from(this._inputList).every(
        (input) => input.validity.valid
      );

      console.log(
        "Form submit - isValid:",
        isValid,
        "button disabled:",
        this._submitButton.disabled
      );

      if (isValid && !this._submitButton.disabled) {
        const formData = this._getInputValues();
        console.log("Form data collected:", formData);
        this._handleFormSubmit(formData);
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
