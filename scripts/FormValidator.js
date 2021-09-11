export class FormValidator {
  constructor(errorInitial, formElement) {
    this._inputSelector = errorInitial.inputSelector;
    this._submitButtonSelector = errorInitial.submitButtonSelector;
    this._inactiveButtonClass = errorInitial.inactiveButtonClass;
    this._inputErrorClass = errorInitial.inputErrorClass;
    this._errorClass = errorInitial.errorClass;
    this._formElement = formElement;
  }
  enableValidation = () => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); //отмена стандартного поведения
    });
    this._setEventListenersForError();
  };
  _setEventListenersForError = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._buttonOnOff();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._buttonOnOff();
      });
    });
  };

  _getInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _buttonOnOff() {
    if (this._getInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  static deleteErrorCaption(form) {
    const errorActiv = Array.from(form.querySelectorAll(".popup__input-error"));
    errorActiv.forEach((errorElement) => {
      errorElement.classList.remove("popup__input-error_active");
    });
  }
}
