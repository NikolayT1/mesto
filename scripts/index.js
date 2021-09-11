import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const modalWindowEditProfile = document.querySelector(".popup_edit-autor");
const formEdit = modalWindowEditProfile.querySelector(".popup__form");
const modalWindowAddCard = document.querySelector(".popup_add-card");
const formAddCard = modalWindowAddCard.querySelector(".popup__form");
const profileAddEdit = document.querySelector(".profile");
const editButton = profileAddEdit.querySelector(".profile__edit-button");
const addButton = profileAddEdit.querySelector(".profile__add-button");
const closeProfileButton = modalWindowEditProfile.querySelector(
  ".popup__close-button"
);
const closeCardButton = modalWindowAddCard.querySelector(
  ".popup__close-button"
);
const nameInput = profileAddEdit.querySelector(".profile__title");
const jobInput = profileAddEdit.querySelector(".profile__subtitle");
/* const cardTemplate = document.querySelector("#item-template").content; */
const cardContainer = document.querySelector(".photo-grid");

const popupImage = document.querySelector(".zoom");
const closeImageButton = popupImage.querySelector(".popup__close-button");

const errorInitial = {
  inputSelector: ".popup__name",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__name_type_error",
  errorClass: "popup__input-error_active",
};
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(errorInitial, formElement);
  formValidator.enableValidation();
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function initializeCardGrid() {
  initialCards.forEach(function (item) {
    const card = new Card(item.link, item.name, "#item-template");
    cardContainer.append(card.createCard());
  });
}
function initCard() {
  formAddCard.link.value = '';
  formAddCard.name.value = '';
  FormValidator.deleteErrorCaption(formAddCard);
  formAddCard.querySelector(".popup__save-button").classList.add("popup__save-button_disabled");
}
function addCard() {
  initCard();
  openPopup(modalWindowAddCard);
}
function initProfile() {
  formEdit.author.value = nameInput.textContent;
  formEdit.interest.value = jobInput.textContent;
  FormValidator.deleteErrorCaption(formEdit);
}
function editProfile() {
  initProfile();
  openPopup(modalWindowEditProfile);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.author.value; //передает имя из popup в input
  jobInput.textContent = formEdit.interest.value; //передает деятельность из popup в input
  closePopup(evt.target.closest(".popup")); // закрывает popup
}
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const card = new Card(formAddCard.link.value, formAddCard.name.value, "#item-template");
  cardContainer.prepend(card.createCard());
  closePopup(evt.target.closest(".popup")); // закрывает popup
}
initializeCardGrid();
/* initProfile(); */
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
editButton.addEventListener("click", editProfile);
closeProfileButton.addEventListener("click", function (evt) {
  closePopup(modalWindowEditProfile);
});
closeCardButton.addEventListener("click", function (evt) {
  closePopup(modalWindowAddCard);
});
formEdit.addEventListener("submit", handleFormEditProfileSubmit);
addButton.addEventListener("click", addCard);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);

closeImageButton.addEventListener("click", function (evt) {
  closePopup(popupImage);
});
popupImage.addEventListener("click", function (evt) {
  closePopup(popupImage);
});

modalWindowEditProfile.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
}); //закрытие всплывающего окна при щелчке на фоне
modalWindowAddCard.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
}); //закрытие всплывающего окна при щелчке на фоне
const conteiners = Array.from(document.querySelectorAll(".popup__container"));
conteiners.forEach((item) => {
  item.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });
}); //не дает всплывать клик для закрытия всплывающего окна