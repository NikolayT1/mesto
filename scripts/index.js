const formElement = document.querySelector(".popup_edit-autor");
const formEdit = formElement.querySelector(".popup__form");
const formCardElement = document.querySelector(".popup_add-card");
const formAddCard = formCardElement.querySelector(".popup__form");
const popupImage = document.querySelector(".zoom");
const profileAddEdit = document.querySelector(".profile");
const editButton = profileAddEdit.querySelector(".profile__edit-button");
const addButton = profileAddEdit.querySelector(".profile__add-button");
const addCardButton = formCardElement.querySelector(".profile__add-button");
const closeButton = formElement.querySelector(".popup__close-button");
const closeCardButton = formCardElement.querySelector(".popup__close-button");
const closeImageButton = popupImage.querySelector(".popup__close-button");
const popapProfileInfo = formElement.querySelectorAll(".popup__name");
const nameInput = profileAddEdit.querySelector(".profile__title");
const jobInput = profileAddEdit.querySelector(".profile__subtitle");
const cardTemplate = document.querySelector("#item-template").content;
const photoItem = document.querySelector(".photo-grid");
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
    const gridItem = cardTemplate
      .querySelector(".photo-grid__item")
      .cloneNode(true);
    gridItem.querySelector(".photo-grid__image").src = item.link;
    gridItem.querySelector(".photo-grid__text").textContent = item.name;
    photoItem.append(gridItem);
    setEventListeners(gridItem); //добавить прослушиватель событий для карточки
  });
}
function addCard() {
  formCardElement.classList.add("popup_opened");
}
function editProfile() {
  console.log(formEdit);
  formEdit.author.value = nameInput.textContent;
  formEdit.interest.value = jobInput.textContent;
  formElement.classList.add("popup_opened");
}
function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
  /* formElement.classList.remove("popup_opened"); */
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.author.value; //передает имя из popup в input
  jobInput.textContent = formEdit.interest.value; //передает деятельность из popup в input
  closePopup(evt); // закрывает popup
}
function formCardSubmitHandler(evt) {
  evt.preventDefault();
  const gridItem = cardTemplate
    .querySelector(".photo-grid__item")
    .cloneNode(true);
  gridItem.querySelector(".photo-grid__image").src = formAddCard.link.value;
  gridItem.querySelector(".photo-grid__text").textContent =
    formAddCard.description.value;
  photoItem.prepend(gridItem);
  setEventListeners(gridItem); //добавить прослушиватель событий для карточки
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
  console.log(evt.target.src);
  popupImage.querySelector(".zoom__image").src = evt.target.src;
  popupImage.querySelector(".zoom__figure-caption").textContent = evt.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__text").textContent;
  popupImage.classList.add("popup_opened");
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
formEdit.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", addCard);
formAddCard.addEventListener("submit", formCardSubmitHandler);