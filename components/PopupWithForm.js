import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { fill, submit }) {
        super(popupSelector);
        this._fill = fill;
        this._submit = submit;
        this._popupForm = this._popup.querySelector(".form");
        this._inputList = Array.from(this._popupForm.querySelectorAll(".form__input"));
    }

    _getInputValues = () => { return this._inputList.map(input => { return input.value }) }

    getPopupForm = () => { return this._popupForm };

    setEventListeners() {
        super.setEventListeners();
        this._inputList.forEach((input, index) => { input.value = this._fill(index) });
        this._popupForm.addEventListener("submit", evt => this._submit(this, evt, this._getInputValues()));
    }
}