require("./index.css");
const Api = require("../components/Api.js");
const constants = require("../utils/constants.js");
const Popup = require("../components/Popup.js");
const Section = require("../components/Section.js");
const Card = require("../components/Card.js");
const PopupWithForm = require("../components/PopupWithForm.js");
const FormValidation = require("../components/FormValidation.js");


const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "ff28a2dc-7828-4f43-b850-e1e913afdd2a",
        "Content-Type": "application/json"
    }
});

const editUserInfo = (name, about, avatar) => {
    if (name && about) {
        constants.profileSelectors[0].textContent = name;
        constants.profileSelectors[1].textContent = about;
    }
    if (avatar) {
        constants.profileSelectors[2].src = avatar
    }
};

api.getUserInfo().then(res => {
    editUserInfo(res.name, res.about, res.avatar);
}).catch(err => console.log(err));

const animateSavingText = (button, text) => {
    let dots = "";
    return setInterval(() => {
        dots = dots.length < 3 ? dots + "." : "";
        button.textContent += `${text}ing${dots}`;
    }, 500);
};

const submitButtonText = (popup) => {
    const submitButton = popup.getSubmitButton();
    const originalText = submitButton.textContent;
    return { loadingAnimation: animateSavingText(submitButton, originalText.slice(0, submitButton.textContent.length - 1)),
        originalText };
};

const fullSizePopup = new Popup(constants.fullImageSelectors.fullImagePopup);
fullSizePopup.setEventListeners();

const deleteCardPopup = new Popup(constants.deleteCardSelectors.deleteCardPopup);
deleteCardPopup.setEventListeners();

const cardList = new Section(
    {
        items: [],
        renderer: (item) => new Card(item, constants.cardSelectors, {
            fullSize: (data) => {
                const { fullImageImgElement, fullImageText } = constants.fullImageSelectors;
                document.querySelector(fullImageImgElement).src = data.link;
                document.querySelector(fullImageImgElement).alt = data.alt;
                document.querySelector(fullImageText).textContent = data.name;
                fullSizePopup.togglePopup();
            },
            deleteCard: (id) => {
                deleteCardPopup.togglePopup();
                document.querySelector(constants.deleteCardSelectors.deleteCardButtonDelete).
                addEventListener("click", () => {
                    const { loadingAnimation, originalText } = submitButtonText(deleteCardPopup);
                    api.deleteCard(id).catch(err => console.log(err)).
                    finally(() => {
                        clearInterval(loadingAnimation);
                        deleteCardPopup.getSubmitButton().textContent = originalText;
                        deleteCardPopup.togglePopup();
                        window.location.reload();
                    });
                });
                document.querySelector(constants.deleteCardSelectors.deleteCardButtonCancel).
                addEventListener("click", () => {
                    deleteCardPopup.togglePopup();
                });
            },
            likeCard: (id) => {
                api.likeCard(id).catch(err => console.log(err));
            }
        }).getCard()
    },
    constants.photoList
);

api.getCards()
    .then(cards => {
        cardList.setItems(cards);
        cardList.renderItems();
    })
    .catch(err => console.log(err));

const updateProfileForm = new PopupWithForm(constants.editSelectors.editPopup, {
    submit: (popup, evt, inputs) => {
        evt.preventDefault();
        const { loadingAnimation, originalText } = submitButtonText(popup);
        api.editUserInfo(inputs[0], inputs[1]).
        then(res => editUserInfo(res.name, res.about)).
        catch(err => console.log(err)).
        finally(() => {
            clearInterval(loadingAnimation);
            popup.getSubmitButton().textContent = originalText;
        });
        popup.togglePopup();
    }
});
updateProfileForm.setEventListeners();
document.querySelector(".profile__edit-profile").addEventListener("click", () => {
    updateProfileForm.togglePopup();
    api.getUserInfo().
    then(res => {
        document.querySelector(constants.editSelectors.editName).value = res.name;
        document.querySelector(constants.editSelectors.editDescription).value = res.about;
    })
});
new FormValidation(updateProfileForm.getPopupForm(), constants.formSelectors).enableValidation();

const newPostForm = new PopupWithForm(constants.newPostSelectors.newPostPopup, {
    submit: (popup, evt, inputs) => {
        evt.preventDefault();
        api.addNewCard(inputs[1], inputs[0]).
        then(() => window.location.reload()).
        catch(err => console.log(err)).
        finally(() => {
            const { loadingAnimation, originalText } = submitButtonText(popup);
            clearInterval(loadingAnimation);
            popup.getSubmitButton().textContent = originalText;
        });
        popup.togglePopup();
    }
});
newPostForm.setEventListeners();
document.querySelector(".profile__new-post").addEventListener("click", () => newPostForm.togglePopup());
new FormValidation(newPostForm.getPopupForm(), constants.formSelectors).enableValidation();

const editAvatarForm = new PopupWithForm(constants.editAvatarSelectors.editAvatarPopup, {
    submit: (popup, evt, inputs) => {
        evt.preventDefault();
        api.editAvatar(inputs[0]).
        then(res => editUserInfo(null, null, res.avatar)).
        catch(err => console.log(err));
        popup.togglePopup();
    }
});
editAvatarForm.setEventListeners();
document.querySelector(".profile__edit-avatar").addEventListener("click", () => editAvatarForm.togglePopup());
new FormValidation(editAvatarForm.getPopupForm(), constants.formSelectors).enableValidation();
