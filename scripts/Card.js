const popupImage = document.querySelector(".zoom");
const popupCardPicture = popupImage.querySelector(".zoom__image");
const popupCardTitle = popupImage.querySelector(".zoom__figure-caption");

export class Card {
  constructor(link, name, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    /* this._cardItem = cardSelector.querySelector(".photo-grid__item").cloneNode(true); */
  }
  createCard() {
    this._cardItem = this._getTemplate();
    this._cardImage = this._cardItem.querySelector(".photo-grid__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardItem.querySelector(".photo-grid__text").textContent = this._name;
    this._setEventListeners();
    return this._cardItem;
  }
  static _closePopup = () => {
    popupImage.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  };
  static _closeByEscape(evt) {
    if (evt.key === "Escape") {
      Card._closePopup(document.querySelector(".popup_opened"));
    }
  }
  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-grid__item")
      .cloneNode(true);
    return cardItem;
  }
  _handleActivHeard() {
    this._cardItem
      .querySelector(".photo-grid__heard")
      .classList.toggle("photo-grid__heard_active");
  }
  _handleMoovToBasket() {
    this._cardItem.remove();
  }
  _handleZoomImage() {
    //всплывающее окно рисунка карточки
    popupCardPicture.src = this._link;
    popupCardPicture.alt = this._name;
    popupCardTitle.textContent = this._name;
    popupImage.classList.add("popup_opened");
    document.addEventListener("keydown", Card._closeByEscape);
    popupImage
      .querySelector(".zoom__figure")
      .addEventListener("click", function (evt) {
        evt.stopPropagation();
      }); //не дает всплывать клик на увеличенном рисунке для закрытия всплывающего окна
  }
  _setEventListeners() {
    this._cardItem
      .querySelector(".photo-grid__heard")
      .addEventListener("click", () => this._handleActivHeard());
    this._cardItem
      .querySelector(".photo-grid__basket")
      .addEventListener("click", () => this._handleMoovToBasket());
    this._cardImage.addEventListener("click", () => this._handleZoomImage());
  }
}
