const Popup = require("./Popup.js");

module.exports = class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector(".form");
        this._inputList = Array.from(this._popupForm.querySelectorAll(".form__input"));
    }

    _getInputValues() { return this._inputList.map(input => { return input.value }) }

    disableSubmit() {
        this._inputList[0].value;
        if (this._inputList.some(input => input.value === "")) {
            const button = this._popup.querySelector(".form__button");
            button.disabled = true;
            button.classList.add("form__button_disabled");
        }
    }

    getPopupForm() { return this._popupForm };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", evt => {
            this._submit(this, evt, this._getInputValues());
            this._popupForm.reset();
        });
    }
}