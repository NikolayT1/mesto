const errorInitial = {
  formSelector: ".popup__form",
  inputSelector: ".popup__name",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__name_type_error",
  errorClass: "popup__input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage, initial) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(initial.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(initial.errorClass);
  console.log("ok");
};

const hideInputError = (formElement, inputElement, initial) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(initial.inputErrorClass);
  errorElement.classList.remove(initial.errorClass);
  errorElement.textContent = "";
};
const isValid = (formElement, inputElement, initial) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      initial
    );
  } else {
    hideInputError(formElement, inputElement, initial);
  }
};

const setEventListenersForError = (formElement, initial) => {
  const inputList = Array.from(
    formElement.querySelectorAll(initial.inputSelector)
  );
  const buttonElement = formElement.querySelector(initial.submitButtonSelector);
  buttonOnOff(inputList, buttonElement, initial);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, initial);
      buttonOnOff(inputList, buttonElement, initial);
    });
  });
};

const enableValidation = (initial) => {
  const formList = Array.from(document.querySelectorAll(initial.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); //отмена стандартного поведения
    });

    setEventListenersForError(formElement, initial);
  });
};
function buttonOnOff(inputList, buttonElement, initial) {
  if (inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })) { buttonElement.classList.add(initial.inactiveButtonClass) }
  else { buttonElement.classList.remove(initial.inactiveButtonClass) };
}
enableValidation(errorInitial);
