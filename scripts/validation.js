const settings = {
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorSelector: ".form__input",
    inputErrorClass: "form__input-error",
    errorSelector: ".form__error",
    errorClass: "form__error_visible"
};

const showInputError = (config, inputElement, errorElement, errorMessage) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (config, inputElement, errorElement) => {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (config, inputElement, errorElement) => {
    !inputElement.validity.valid ? showInputError(config, inputElement, errorElement, inputElement.validationMessage) :
        hideInputError(config, inputElement, errorElement);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (config, inputList, buttonElement) => {
    buttonElement.disabled = hasInvalidInput(inputList);
    buttonElement.classList.toggle(config.inactiveButtonClass, buttonElement.disabled);
};

const resetValidation = (modal) => {
    const inputList = Array.from(modal.querySelectorAll(settings.inputSelector));

    inputList.forEach((inputElement) => {
        const errorElement = inputElement.parentElement.querySelector(settings.errorSelector);
        hideInputError(settings, inputElement, errorElement);
    });
};

const disableButton = (config, formElement, inputList, buttonElement) => {
    toggleButtonState(inputList, buttonElement, config);

    formElement.addEventListener("reset", () => {
        disableButton(buttonElement, config);
    });
};

const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    disableButton(config, formElement, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        const errorElement = inputElement.parentElement.querySelector(config.errorSelector);
        inputElement.addEventListener("input", (evt) => {
            checkInputValidity(config, evt.currentTarget, errorElement);
            toggleButtonState(config, inputList, buttonElement);
        });
        inputElement.addEventListener("click", (evt) => {
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