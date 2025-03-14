require("./index.css");
const { profileForm, editAvatarForm, newPostForm, cardList, profileSelectors, newPostSelectors, fullImageSelectors, editAvatarSelectors, deleteCardSelectors } = require("../utils/constants.js");
const Api = require("../components/Api.js");
const {resetValidation, disableButton} = require("../scripts/validation.js");
const { editUserInfo, handleSubmit, togglePopup } = require("../utils/utils.js");

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "ff28a2dc-7828-4f43-b850-e1e913afdd2a",
        "Content-Type": "application/json"
    }
});

api.getUserInfo().then(res => {
    editUserInfo(res.name, res.about, res.avatar);
}).catch(err => console.log(err));

function fillEditFormFields() {
    profileSelectors.editName.value =
        profileSelectors.profileUserName.textContent.trim();
    profileSelectors.editDescription.value =
        profileSelectors.profileDescription.textContent.trim();
}

function setProfilePopupListeners() {
    const popup = profileSelectors.editPopup
    profileSelectors.editButton.addEventListener("click", () => {
        resetValidation(profileForm);
        fillEditFormFields();
        togglePopup(popup);
    });

    profileForm.addEventListener("submit", (evt) => handleSubmit(evt, popup, evt.submitter, () => {
        return api.editUserInfo(profileSelectors.editName.value, profileSelectors.editDescription.value).
        then(res => {
            editUserInfo(res.name, res.about);
        })
    }));
}

function setAvatarPopupListeners() {
    const popup = editAvatarSelectors.editAvatarPopup;
    editAvatarSelectors.editAvatarButton.addEventListener("click", () => {
        resetValidation(editAvatarForm);
        togglePopup(popup);
        disableButton(editAvatarForm);
    });

    editAvatarForm.addEventListener("submit", (evt) => handleSubmit(evt, popup, evt.submitter, () => {
        return api.editAvatar(editAvatarSelectors.editAvatarLink.value).then(res => {
            editUserInfo(null, null, res.avatar);
        });
    }));
}

function renderCard(data) {
    cardList.prepend(getCardElement(data));
}

function openFullImage(data) {
    fullImageSelectors.fullImageImgElement.src = "";
    fullImageSelectors.fullImageImgElement.alt = "";
    fullImageSelectors.fullImageText.textContent = "";
    togglePopup(fullImageSelectors.fullImagePopup);
    fullImageSelectors.fullImageImgElement.src = data.src;
    fullImageSelectors.fullImageImgElement.alt = data.alt;
    fullImageSelectors.fullImageText.textContent = data.name;
}

function setDeleteCardPopupListeners(evt, popup, card) {
    const deleteButton = deleteCardSelectors.deleteCardButtonDelete;
    const cancelButton = deleteCardSelectors.deleteCardButtonCancel;

    const deleteButtonHandler = () => {
        return function handler() {
            handleSubmit(evt, popup, deleteButton, () => {
                return api.deleteCard(card.id).then(() => {
                    card.remove();
                    deleteButton.removeEventListener("click", handler);
                });
            });
        };
    };

    const cancelButtonHandler = () => {
        togglePopup(deleteCardSelectors.deleteCardPopup);
        cancelButton.removeEventListener("click", cancelButtonHandler);
    };

    return () => {
        deleteButton.removeEventListener("click", deleteButton._handler);
        deleteButton._handler = deleteButtonHandler(evt, popup, card);
        deleteButton.addEventListener("click", deleteButton._handler);

        cancelButton.removeEventListener("click", cancelButtonHandler);
        cancelButton.addEventListener("click", cancelButtonHandler);
    };
}

function getCardElement(data) {
    const cardElement = document
        .querySelector("#card-template")
        .content.querySelector(".photos__list-item")
        .cloneNode(true);
    cardElement.querySelector(".card__text").textContent = data.name;
    const cardPhoto = cardElement.querySelector(".card__image");
    const cardElementLike = cardElement.querySelector(".card__like-button");
    cardPhoto.src = data.src;
    cardPhoto.alt = data.alt;
    cardElement.id = data.id;
    if (data.isLiked){
        cardElementLike.classList.toggle("card__like-button_active");
    }

    cardElementLike.addEventListener("click", () => {
        api.likeCard(data.id).then(() => {
            cardElementLike.classList.toggle("card__like-button_active");
        }).catch(err => console.log(err));
    });
    const cardElementDelete = cardElement.querySelector(".card__delete-button");
    cardElementDelete.addEventListener("click", (evt) => {
        togglePopup(deleteCardSelectors.deleteCardPopup);
        setDeleteCardPopupListeners(evt, deleteCardSelectors.deleteCardPopup, cardElement)();
    });

    const cardElementFullImageButton = cardElement.querySelector(
        ".card__full-image-button",
    );
    cardElementFullImageButton.addEventListener("click", () =>
        openFullImage(data),
    );

    return cardElement;
}

(function addCards() {
    api.getCards().then(cards => {
        cards.reverse().forEach(card => {
            renderCard({
                name: card.name,
                src: card.link,
                alt: card.name.toString().toLocaleLowerCase().replace(" ", "_"),
                id: card._id,
                isLiked: card.isLiked
            })
        })
    }).catch(err => console.log(err));
})();

function setNewPostPopupListeners() {
    const popup = newPostSelectors.newPostPopup;

    newPostSelectors.newPostButton.addEventListener("click", () => {
        resetValidation(newPostForm);
        togglePopup(popup);
        disableButton(newPostForm);
    });

    newPostForm.addEventListener("submit", (evt) => handleSubmit(evt, popup, evt.submitter, () => {
        return api.addNewCard(newPostSelectors.newPostCaption.value, newPostSelectors.newPostImageLink.value).
        then(card => {
            renderCard({
                name: card.name,
                src: card.link,
                alt: card.name.toString().toLocaleLowerCase().replace(" ", "_"),
                id: card.id,
                isLiked: card.isLiked
            });
        });
    }));
}

function setCloseButtonListeners() {
    const closeButtons = document.querySelectorAll(".popup__close");

    closeButtons.forEach((button) => {
        const popup = button.closest(".popup");
        button.addEventListener("click", () => togglePopup(popup));
    });
}

setProfilePopupListeners();
setAvatarPopupListeners();
setDeleteCardPopupListeners();
setNewPostPopupListeners();
setCloseButtonListeners();