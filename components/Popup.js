export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _isOpen = () => this._popup.classList.contains("popup_visible");

    _handleEscapeClose = evt => { if (evt.key === "Escape") this.togglePopup() }

    _handleMouseClickClose = evt => { if (evt.target === this._popup.children[0]) this.togglePopup() }

    _addPopupClose = () => {
        document.addEventListener("keydown", this._handleEscapeClose);
        document.addEventListener("click", this._handleMouseClickClose);
    }

    _removePopupClose = () => {
        document.removeEventListener("keydown", this._handleEscapeClose);
        document.removeEventListener("click", this._handleMouseClickClose);
    }

    togglePopup = () => {
        this._isOpen() ? this._removePopupClose() : this._addPopupClose();
        this._popup.classList.toggle("popup_visible");
    };

    setEventListeners() {
        this._popup.querySelector(".popup__close").addEventListener("click", this.togglePopup);
        this._popup.addEventListener("click", evt => {
            if (evt.target === this._popup) this.togglePopup();
        });
    }
}