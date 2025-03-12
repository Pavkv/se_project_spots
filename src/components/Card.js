module.exports = class Card {
    constructor( data, cardSelectors, { fullSize, deleteCard, likeCard }) {
        this._data = data;
        this._cardSelectors = cardSelectors;
        this._fullSize = fullSize;
        this._deleteCard = deleteCard;
        this._likeCard = likeCard;
    }

    _getElement() {
        this._cardElement = document.querySelector(this._cardSelectors.cardTemplate).content.cloneNode(true);
        this._cardText = this._cardElement.querySelector(this._cardSelectors.cardText);
        this._cardPhoto = this._cardElement.querySelector(this._cardSelectors.cardPhoto);
        this._cardLike = this._cardElement.querySelector(this._cardSelectors.cardLike);
        this._cardDelete = this._cardElement.querySelector(this._cardSelectors.cardDelete);
        this._cardFull = this._cardElement.querySelector(this._cardSelectors.cardFull);
    }

    _toggleCardLike () {
        this._cardLike.classList.toggle(this._cardSelectors.cardLikeActive);
    }

    _setEventListeners() {
        this._card = this._cardDelete.closest(this._cardSelectors.cardItem);
        this._cardLike.addEventListener("click", () => {
            this._likeCard(this._card.id);
            this._toggleCardLike();
        });
        this._cardDelete.addEventListener("click", () => {
            this._deleteCard(this._card);
        });
        this._cardFull.addEventListener("click", () => this._fullSize(this._data));
    }

    getCard() {
        this._getElement();
        this._cardText.textContent = this._data.name;
        this._cardPhoto.src = this._data.link;
        this._cardPhoto.alt = this._data.alt;
        this._setEventListeners();
        this._card.id = this._data._id;
        if (this._data.isLiked) {
            this._toggleCardLike()
        }
        return this._cardElement;
    }
}