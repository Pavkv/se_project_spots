require("./index.css");
const { profileForm, editAvatarForm, newPostForm, cardList, profileSelectors, newPostSelectors, fullImageSelectors, editAvatarSelectors, deleteCardSelectors } = require("../utils/constants.js");
const Api = require("../components/Api.js");
const {resetValidation, disableButton} = require("../scripts/validation.js");

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "ff28a2dc-7828-4f43-b850-e1e913afdd2a",
        "Content-Type": "application/json"
    }
});

const editUserInfo = (name, about, avatar) => {
    if (name && about) {
        profileSelectors.profileUserName.textContent = name;
        profileSelectors.profileDescription.textContent = about;
    }
    if (avatar) {
        profileSelectors.profileAvatar.src = avatar
    }
};

api.getUserInfo().then(res => {
    editUserInfo(res.name, res.about, res.avatar);
}).catch(err => console.log(err));

const getSubmitButton = (popup) => {
    return popup.querySelector("button[type='submit']");
};

const animateText = (button, text) => {
    let dots = "";
    return setInterval(() => {
        dots = dots.length < 3 ? dots + "." : "";
        button.textContent = `${text}ing${dots}`;
    }, 500);
};

const submitButtonText = (popup) => {
    const submitButton = getSubmitButton(popup);
    const originalText = submitButton.textContent;
    return {
        loadingAnimation: animateText(submitButton, originalText.slice(0, submitButton.textContent.length - 1)),
        originalText
    };
};

const handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
        const openPopup = document.querySelector(".popup.popup_visible");
        if (openPopup) {
            togglePopup(openPopup);
            document.activeElement.blur();
        }
    }
};

const handleMouseClickClose = (evt) => {
    const openPopup = document.querySelector(".popup.popup_visible");
    if (openPopup && evt.target === openPopup.children[0]) {
        togglePopup(openPopup);
    }
};

const addPopupListeners = () => {
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("click", handleMouseClickClose);
};

const removePopupListeners = () => {
    document.removeEventListener("keydown", handleEscapeClose);
    document.removeEventListener("click", handleMouseClickClose);
};

function togglePopup(popup) {
    popup.classList.toggle("popup_visible");
    const isOpened = popup.classList.contains("popup_visible");
    isOpened ? addPopupListeners() : removePopupListeners();
}

function fillEditFormFields() {
    profileSelectors.editName.value =
        profileSelectors.profileUserName.textContent.trim();
    profileSelectors.editDescription.value =
        profileSelectors.profileDescription.textContent.trim();
}

function setProfilePopupListeners() {
    profileSelectors.editButton.addEventListener("click", () => {
        resetValidation(profileForm);
        fillEditFormFields();
        togglePopup(profileSelectors.editPopup);
    });
    
    profileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const popup = profileSelectors.editPopup;
        const { loadingAnimation, originalText } = submitButtonText(popup);
        api.editUserInfo(profileSelectors.editName.value, profileSelectors.editDescription.value).
        then(res => editUserInfo(res.name, res.about)).
        catch(err => console.log(err)).
        finally(() => {
            clearInterval(loadingAnimation);
            getSubmitButton(popup).textContent = originalText;
            togglePopup(popup);
        });
    });
}

function setAvatarPopupListeners() {
    editAvatarSelectors.editAvatarButton.addEventListener("click", () => {
        resetValidation(editAvatarSelectors.editAvatarPopup);
        togglePopup(editAvatarSelectors.editAvatarPopup);
    });

    editAvatarForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const popup = editAvatarSelectors.editAvatarPopup;
        const { loadingAnimation, originalText } = submitButtonText(popup);
        api.editAvatar(editAvatarSelectors.editAvatarLink.value).
        then(res => editUserInfo(null, null, res.avatar)).
        catch(err => console.log(err)).
        finally(() => {
            clearInterval(loadingAnimation);
            getSubmitButton(popup).textContent = originalText;
            editAvatarForm.reset();
            disableButton(editAvatarForm);
            togglePopup(popup);
        });
    });
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

function setDeleteCardPopupListeners(card) {
    const deleteButton = deleteCardSelectors.deleteCardButtonDelete;
    const cancelButton = deleteCardSelectors.deleteCardButtonCancel;

    const deleteButtonHandler = () => {
        return function handler() {
            const {loadingAnimation, originalText} = submitButtonText(deleteCardSelectors.deleteCardPopup);
            api.deleteCard(card.id).catch(err => console.log(err)).finally(() => {
                clearInterval(loadingAnimation);
                getSubmitButton(deleteCardSelectors.deleteCardPopup).textContent = originalText;
                togglePopup(deleteCardSelectors.deleteCardPopup);
                card.remove();
                deleteButton.removeEventListener("click", handler);
            });
        };
    };

    const cancelButtonHandler = () => {
        togglePopup(deleteCardSelectors.deleteCardPopup);
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
        api.likeCard(data.id).catch(err => console.log(err));
        cardElementLike.classList.toggle("card__like-button_active");
    });
    const cardElementDelete = cardElement.querySelector(".card__delete-button");
    cardElementDelete.addEventListener("click", () => {
        togglePopup(deleteCardSelectors.deleteCardPopup);
        setDeleteCardPopupListeners(cardElement)();
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
    newPostSelectors.newPostButton.addEventListener("click", () => {
        resetValidation(newPostForm);
        togglePopup(newPostSelectors.newPostPopup);
    });

    newPostForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const popup = newPostSelectors.newPostPopup;
        const { loadingAnimation, originalText } = submitButtonText(popup);
        api.addNewCard(newPostSelectors.newPostCaption.value, newPostSelectors.newPostImageLink.value).
        then(card => {
            renderCard({
                name: card.name,
                src: card.link,
                alt: card.name.toString().toLocaleLowerCase().replace(" ", "_"),
                id: card._id,
                isLiked: card.isLiked
            });
        }).
        catch(err => console.log(err)).
        finally(() =>{
            clearInterval(loadingAnimation);
            getSubmitButton(popup).textContent = originalText;
            newPostForm.reset();
            disableButton(newPostForm);
            togglePopup(popup);
        });
    });
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