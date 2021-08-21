const modalWindowEditProfile = document.querySelector(".popup_edit-autor");
const formEdit = modalWindowEditProfile.querySelector(".popup__form");
const modalWindowAddCard = document.querySelector(".popup_add-card");
const formAddCard = modalWindowAddCard.querySelector(".popup__form");
const popupImage = document.querySelector(".zoom");
const popupCardPicture = popupImage.querySelector(".zoom__image");
const popupCardTitle = popupImage.querySelector(".zoom__figure-caption");
const profileAddEdit = document.querySelector(".profile");
const editButton = profileAddEdit.querySelector(".profile__edit-button");
const addButton = profileAddEdit.querySelector(".profile__add-button");
const closeButton = modalWindowEditProfile.querySelector(
  ".popup__close-button"
);
const closeCardButton = modalWindowAddCard.querySelector(
  ".popup__close-button"
);
const closeImageButton = popupImage.querySelector(".popup__close-button");
const nameInput = profileAddEdit.querySelector(".profile__title");
const jobInput = profileAddEdit.querySelector(".profile__subtitle");
const cardTemplate = document.querySelector("#item-template").content;
const photoItem = document.querySelector(".photo-grid");

function createCard(link, name) {
  const gridItem = cardTemplate
    .querySelector(".photo-grid__item")
    .cloneNode(true);
  gridItem.querySelector(".photo-grid__image").src = link;
  gridItem.querySelector(".photo-grid__image").alt = name;
  gridItem.querySelector(".photo-grid__text").textContent = name;
  setEventListeners(gridItem); //добавить прослушиватель событий для карточки
  return gridItem;
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function initialCardGrid() {
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
  initialCards.forEach(function (item) {
    const cardItem = createCard(item.link, item.name);
    photoItem.append(cardItem);
  });
}
function deliteErrorCaption(form) {
  const errorActiv = Array.from(form.querySelectorAll(".popup__input-error"));
  errorActiv.forEach((errorElement) => {
    errorElement.classList.remove("popup__input-error_active");
  });
}
function initCard() {
  formAddCard.link.value = '';
  formAddCard.name.value = '';
  deliteErrorCaption(formAddCard);
  formAddCard.querySelector(".popup__save-button").classList.add("popup__save-button_disabled");
}
function addCard() {
  initCard();
  openPopup(modalWindowAddCard);
}
function initProfile() {
  formEdit.author.value = nameInput.textContent;
  formEdit.interest.value = jobInput.textContent;
  deliteErrorCaption(formEdit);
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
  const cardItem = createCard(formAddCard.link.value, formAddCard.name.value);
  photoItem.prepend(cardItem);
  closePopup(evt.target.closest(".popup")); // закрывает popup
}
initialCardGrid();
function handleActivHeard(evt) {
  evt.target.classList.toggle("photo-grid__heard_active");
}
function handleMoovToBasket(evt) {
  evt.target.closest(".photo-grid__item").remove();
}
function handleZoomImage(evt) {
  popupCardPicture.src = evt.target.src;
  popupCardPicture.alt = evt.target.src;
  popupCardTitle.textContent = evt.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__text").textContent;
  openPopup(popupImage);
}
function setEventListeners(item) {
  item
    .querySelector(".photo-grid__heard")
    .addEventListener("click", handleActivHeard);
  item
    .querySelector(".photo-grid__basket")
    .addEventListener("click", handleMoovToBasket);
  item
    .querySelector(".photo-grid__image")
    .addEventListener("click", handleZoomImage);
}
initProfile();
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
});
closeCardButton.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
});
closeImageButton.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
});
formEdit.addEventListener("submit", handleFormEditProfileSubmit);
addButton.addEventListener("click", addCard);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);
modalWindowEditProfile.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
}); //закрытие всплывающего окна при щелчке на фоне
modalWindowAddCard.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
}); //закрытие всплывающего окна при щелчке на фоне
popupImage.addEventListener("click", function (evt) {
  closePopup(evt.target.closest(".popup"));
}); //закрытие всплывающего окна при щелчке на фоне

const conteiners = Array.from(document.querySelectorAll(".popup__container"));
conteiners.forEach((item) => {
  item.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });
}); //не дает всплывать клик для закрытия всплывающего окна
popupImage
  .querySelector(".zoom__figure")
  .addEventListener("click", function (evt) {
    evt.stopPropagation();
  }); //не дает всплывать клик на увеличенном рисунке для закрытия всплывающего окна