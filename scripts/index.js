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
function openPopap(popap) {
  popap.classList.add("popup_opened");
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
function addCard() {
  openPopap(modalWindowAddCard);
}
function editProfile() {
  formEdit.author.value = nameInput.textContent;
  formEdit.interest.value = jobInput.textContent;
  openPopap(modalWindowEditProfile);
}
function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
}
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.author.value; //передает имя из popup в input
  jobInput.textContent = formEdit.interest.value; //передает деятельность из popup в input
  closePopup(evt); // закрывает popup
}
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const cardItem = createCard(formAddCard.link.value, formAddCard.name.value);
  photoItem.prepend(cardItem);
  closePopup(evt); // закрывает popup
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
  openPopap(popupImage);
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
editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closePopup);
closeCardButton.addEventListener("click", closePopup);
closeImageButton.addEventListener("click", closePopup);
formEdit.addEventListener("submit", handleFormEditProfileSubmit);
addButton.addEventListener("click", addCard);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);
