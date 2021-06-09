let formElement = document.querySelector(".popup_edit-autor");
let formEdit = formElement.querySelector(".popup__form");
let formCardElement = document.querySelector(".popup_add-card");
let formAddCard = formCardElement.querySelector(".popup__form");

let popupImage = document.querySelector(".popup_image");

let profileAddEdit = document.querySelector(".profile");
let editButton = profileAddEdit.querySelector(".profile__edit-button");
let addButton = profileAddEdit.querySelector(".profile__add-button");
let addCardButton = formCardElement.querySelector(".profile__add-button");

let closeButton = formElement.querySelector(".popup__close-button");
let closeCardButton = formCardElement.querySelector(".popup__close-button");
let closeImageButton = document.querySelector(".popup_image").querySelector(".popup__close-button");

let popapProfileInfo = formElement.querySelectorAll(".popup__name");
let nameInput = profileAddEdit.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let jobInput = profileAddEdit.querySelector(".profile__subtitle"); // Воспользуйтесь инструментом .querySelector()
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
    const gridItem = cardTemplate.querySelector(".photo-grid__item").cloneNode(true);
    gridItem.querySelector(".photo-grid__image").src = item.link;
    gridItem.querySelector(".photo-grid__text").textContent = item.name;
    photoItem.append(gridItem);
    setEventListeners(gridItem);//добавить прослушиватель событий для карточки
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
 evt.target.closest('.popup').classList.remove("popup_opened");
  /* formElement.classList.remove("popup_opened"); */
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.author.value; //передает имя из popup в input
  jobInput.textContent = formEdit.interest.value; //передает деятельность из popup в input
  closePopup(evt); // закрывает popup
}
function formCardSubmit(evt) {
  evt.preventDefault();
  const gridItem = cardTemplate.querySelector(".photo-grid__item").cloneNode(true);
    gridItem.querySelector(".photo-grid__image").src = formAddCard.interest.value;
    gridItem.querySelector(".photo-grid__text").textContent = formAddCard.author.value;
    photoItem.append(gridItem);
    setEventListeners(gridItem);//добавить прослушиватель событий для карточки
  closePopup(evt); // закрывает popup
}
/* function addCard () {
  const cardTemplate = document.querySelector('#item-template').content;
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

  cardElement.querySelector('.photo-grid__image').src = artistValue;
  cardElement.querySelector('.photo-grid__image').alt = titleValue;
  cardElement.querySelector('.photo-grid__text').textContent = titleValue;
  songsContainer.append(songElement);
} */
initialCardGrid();

function handleActivHeard(evt) {
	evt.target.classList.toggle("photo-grid__heard_active");
}
function handleMoovToBasket(evt) {
  evt.target.closest('.photo-grid__item').remove();
}
function handleZoomImage(evt) {
  console.log(evt.target.src);
  popupImage.querySelector(".popup__image").src = evt.target.src;
  popupImage.querySelector(".popup__figure-caption").textContent = evt.target.closest('.photo-grid__item').querySelector('.photo-grid__text').textContent;
  popupImage.classList.add("popup_opened");
}
function setEventListeners(item) {
	item.querySelector('.photo-grid__heard').addEventListener('click', handleActivHeard);
	item.querySelector('.photo-grid__basket').addEventListener('click', handleMoovToBasket);
  item.querySelector('.photo-grid__image').addEventListener('click', handleZoomImage);
	/* item.querySelector('.edit').addEventListener('click', handleEdit); */
}

editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closePopup);
closeCardButton.addEventListener("click", closePopup);
closeImageButton.addEventListener("click", closePopup);
formEdit.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", addCard);
formAddCard.addEventListener("submit", formCardSubmit);