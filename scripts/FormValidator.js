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
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._buttonOnOff(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._buttonOnOff(inputList, buttonElement);
      });
    });
  };

  _getInvalidInput(inputElement) {
    return !inputElement.validity.valid;
  }

  _buttonOnOff(inputList, buttonElement) {
    if (
      inputList.some((inputElement) => {
        return this._getInvalidInput(inputElement);
      })
    ) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
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
