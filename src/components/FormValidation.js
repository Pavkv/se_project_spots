module.exports = class FormValidation {
    constructor(formElement, formSelectors) {
        this._formElement = formElement;
        this._formSelectors = formSelectors;
        this._inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
        this._buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
    }

    _showInputError = (inputElement, errorElement) => {
        inputElement.classList.add(this._formSelectors.inputErrorClass);
        errorElement.classList.add(this._formSelectors.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError = (inputElement, errorElement) => {
        inputElement.classList.remove(this._formSelectors.inputErrorClass);
        errorElement.classList.remove(this._formSelectors.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity = (inputElement, errorElement) => {
        inputElement.validity.valid ? this._hideInputError(inputElement, errorElement) :
            this._showInputError(inputElement, errorElement);
    };

    _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);

    _toggleButtonState = () => {
        const isDisabled = this._hasInvalidInput();
        this._buttonElement.disabled = isDisabled;
        this._buttonElement.classList.toggle(this._formSelectors.inactiveButtonClass, isDisabled);
    };

    _disableButton = () => {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._formSelectors.inactiveButtonClass);
    }

    _resetValidation = () => {
        this._inputList.forEach(inputElement => {
            const errorElement = inputElement.parentElement.querySelector(this._formSelectors.errorSelector);
            this._hideInputError(inputElement, errorElement);
        });
    };

    _setEventListeners = () => {
        this._formElement.addEventListener("reset", this._disableButton);
        this._inputList.forEach(inputElement => {
            const errorElement = inputElement.parentElement.querySelector(this._formSelectors.errorSelector);
            const validateInput = () => {
                this._checkInputValidity(inputElement, errorElement);
                this._toggleButtonState();
            };
            inputElement.addEventListener("input", validateInput);
            inputElement.addEventListener("click", validateInput);
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._resetValidation();
        });
        this._setEventListeners();
    };
}