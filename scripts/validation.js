const settings = {
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorSelector: ".form__input-error",
    errorClass: "form__input-error_visible"
};

const showInputError = (config, errorElement, errorMessage) => {
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (config, errorElement) => {
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (config, inputElement, errorElement) => {
    !inputElement.validity.valid ? showInputError(config, errorElement, inputElement.validationMessage) :
        hideInputError(config, errorElement);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (config, inputList, buttonElement) => {
    buttonElement.disabled = hasInvalidInput(inputList);
    buttonElement.classList.toggle(config.inactiveButtonClass, buttonElement.disabled);
};

const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        const errorElement = inputElement.parentElement.querySelector(config.inputErrorSelector);
        inputElement.addEventListener("input", (evt) => {
            checkInputValidity(config, evt.currentTarget, errorElement);
            toggleButtonState(config, inputList, buttonElement);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(config, formElement);
    });
};

enableValidation(settings);