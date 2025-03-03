export default class Card {
    constructor(data, cardSelectors, { fullSize }) {
        this._data = data;
        this._cardSelectors = cardSelectors;
        this._fullSize = fullSize;
    }

    _getElement = () => {
        this._cardElement = document.querySelector(this._cardSelectors.cardTemplate).content.cloneNode(true);
        this._cardText = this._cardElement.querySelector(this._cardSelectors.cardText);
        this._cardPhoto = this._cardElement.querySelector(this._cardSelectors.cardPhoto);
        this._cardLike = this._cardElement.querySelector(this._cardSelectors.cardLike);
        this._cardDelete = this._cardElement.querySelector(this._cardSelectors.cardDelete);
        this._cardFull = this._cardElement.querySelector(this._cardSelectors.cardFull);
    };

    _setEventListeners = () => {
        this._cardLike.addEventListener("click", () => this._cardLike.classList.toggle(this._cardSelectors.cardLikeActive));
        this._cardDelete.addEventListener("click", () => this._cardDelete.closest(this._cardSelectors.cardItem).remove() );
        this._cardFull.addEventListener("click", () => this._fullSize(this._data));
    };

    getCard = () => {
        this._getElement();
        this._cardText.textContent = this._data.name;
        this._cardPhoto.src = this._data.src;
        this._cardPhoto.alt = this._data.alt;
        this._setEventListeners();
        return this._cardElement;
    };
}