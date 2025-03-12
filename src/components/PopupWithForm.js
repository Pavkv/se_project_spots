const Popup = require("./Popup.js");

module.exports = class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector(".form");
        this._inputList = Array.from(this._popupForm.querySelectorAll(".form__input"));
    }

    _getInputValues = () => { return this._inputList.map(input => { return input.value }) }

    getPopupForm = () => { return this._popupForm };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", evt => this._submit(this, evt, this._getInputValues()));
    }
}