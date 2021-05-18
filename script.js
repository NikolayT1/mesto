let formElement = document.querySelector(".popup");
let profileAddEdit = document.querySelector(".profile");
let EditButton = profileAddEdit.querySelector(".profile__edit-button");
let addButton = profileAddEdit.querySelector(".profile__add-button");
let closeButton = formElement.querySelector(".popup__close-button");
let saveButton = formElement.querySelector(".popup__save-button");
console.log("hi");
function EditProfile() {
  let popapProfileInfo = formElement.querySelectorAll(".popup__name");
  let profileInfoName = profileAddEdit.querySelector(".profile__title");
  let profileInfoWork = profileAddEdit.querySelector(".profile__subtitle");
  popapProfileInfo[0].value = profileInfoName.textContent;
  popapProfileInfo[1].value = profileInfoWork.textContent;
  formElement.classList.add("popup_opened");
}

function closePopup() {
  formElement.classList.remove("popup_opened");
}
function savePopup() {
  let popapProfileInfo = formElement.querySelectorAll(".popup__name");
  let profileInfoName = profileAddEdit.querySelector(".profile__title");
  let profileInfoWork = profileAddEdit.querySelector(".profile__subtitle");
  profileInfoName.textContent = popapProfileInfo[0].value;
  profileInfoWork.textContent = popapProfileInfo[1].value;
  formElement.classList.remove("popup_opened");
}
EditButton.addEventListener("click", EditProfile);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", savePopup);

// Находим форму в DOM
/* let formElement = document.querySelector(".popup"); */
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".profile__subtitle"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileInfoName.textContent = nameInput.value;
  profileInfoWork.textContent = jobInput.value;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
