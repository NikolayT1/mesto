export class Card {
    constructor(link, name, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardItem = cardSelector.querySelector(".photo-grid__item").cloneNode(true);
    }
    createCard() {
        this._cardItem.querySelector(".photo-grid__image").src = this._link;
        this._cardItem.querySelector(".photo-grid__image").alt = this._name;
        this._cardItem.querySelector(".photo-grid__text").textContent = this._name;
        this._setEventListeners();
        return this._cardItem;
    }
    static _closePopup = () => {
        const popupImage = document.querySelector(".zoom");
        popupImage.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._closeByEscape);
    }
    static _closeByEscape(evt) {
        if (evt.key === "Escape") {
            Card._closePopup(document.querySelector(".popup_opened"));
        }
    }
    _handleActivHeard(evt) {
        evt.target.classList.toggle("photo-grid__heard_active");
    }
    _handleMoovToBasket(evt) {
        evt.target.closest(".photo-grid__item").remove();
    }
    static _handleZoomImage(evt) {//всплывающее окно рисунка карточки
        const popupImage = document.querySelector(".zoom");
        const popupCardPicture = popupImage.querySelector(".zoom__image");
        const popupCardTitle = popupImage.querySelector(".zoom__figure-caption");
        const closeImageButton = popupImage.querySelector(".popup__close-button");
        popupCardPicture.src = evt.target.src;
        popupCardPicture.alt = evt.target.src;
        popupCardTitle.textContent = evt.target
            .closest(".photo-grid__item")
            .querySelector(".photo-grid__text").textContent;
        popupImage.classList.add("popup_opened");
        document.addEventListener("keydown", Card._closeByEscape);
        closeImageButton.addEventListener("click", Card._closePopup);
        popupImage.addEventListener("click", Card._closePopup);
        //закрытие всплывающего окна при щелчке на фоне
        popupImage
            .querySelector(".zoom__figure")
            .addEventListener("click", function (evt) {
                evt.stopPropagation();
            }); //не дает всплывать клик на увеличенном рисунке для закрытия всплывающего окна
        console.log("handleZoomImage");
    }
    _setEventListeners() {
        this._cardItem
            .querySelector(".photo-grid__heard")
            .addEventListener("click", this._handleActivHeard);
        this._cardItem
            .querySelector(".photo-grid__basket")
            .addEventListener("click", this._handleMoovToBasket);
        this._cardItem
            .querySelector(".photo-grid__image")
            .addEventListener("click", Card._handleZoomImage);
    }
}