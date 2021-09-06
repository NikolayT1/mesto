export class FormValidator {
    constructor(errorInitial, formElement) {
        this._formSelector = errorInitial.formSelector;
        this._inputSelector = errorInitial.inputSelector;
        this._submitButtonSelector = errorInitial.submitButtonSelector;
        this._inactiveButtonClass = errorInitial.inactiveButtonClass;
        this._inputErrorClass = errorInitial.inputErrorClass;
        this._errorClass = errorInitial.errorClass;
    }
}