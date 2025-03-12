module.exports = deleteCardPopupHandler = (deleteCardButtonDelete, deleteCardButtonCancel, deleteCardPopup,
                                           api, submitButtonText, card) => {
    const deleteButton = document.querySelector(deleteCardButtonDelete);
    const cancelButton = document.querySelector(deleteCardButtonCancel);

    const deleteButtonHandler = () => {
        return function handler() {
            const {loadingAnimation, originalText} = submitButtonText(deleteCardPopup);
            api.deleteCard(card.id).catch(err => console.log(err)).finally(() => {
                clearInterval(loadingAnimation);
                deleteCardPopup.getSubmitButton().textContent = originalText;
                deleteCardPopup.togglePopup();
                card.remove();
                deleteButton.removeEventListener("click", handler);
            });
        };
    };

    const cancelButtonHandler = () => {
        deleteCardPopup.togglePopup();
        cancelButton.removeEventListener("click", cancelButtonHandler);
    };

    return () => {
        deleteButton.removeEventListener("click", deleteButton._handler);
        deleteButton._handler = deleteButtonHandler(card);
        deleteButton.addEventListener("click", deleteButton._handler);

        cancelButton.removeEventListener("click", cancelButtonHandler);
        cancelButton.addEventListener("click", cancelButtonHandler);
    };
}