let formElement = document.querySelector(".popup");
let formEdit = formElement.querySelector(".popup__form");
let profileAddEdit = document.querySelector(".profile");
let editButton = profileAddEdit.querySelector(".profile__edit-button");
let closeButton = formElement.querySelector(".popup__close-button");
let popapProfileInfo = formElement.querySelectorAll(".popup__name");
let nameInput = profileAddEdit.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let jobInput = profileAddEdit.querySelector(".profile__subtitle"); // Воспользуйтесь инструментом .querySelector()
function editProfile() {
  formEdit.author.value = nameInput.textContent;
  formEdit.interest.value = jobInput.textContent;
  formElement.classList.add("popup_opened");
}
function closePopup() {
  formElement.classList.remove("popup_opened");
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.author.value;//передает имя из popup в input
  jobInput.textContent = formEdit.interest.value;//передает деятельность из popup в input
  closePopup();// закрывает popup
}
editButton.addEventListener("click", editProfile); 
closeButton.addEventListener("click", closePopup);
formEdit.addEventListener("submit", formSubmitHandler);