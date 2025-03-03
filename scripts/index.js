import * as constants from "../utils/constants.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidation from "../components/FormValidation.js";

const fullSizePopup = new Popup(constants.fullImageSelectors.fullImagePopup);
fullSizePopup.setEventListeners();

const cardList = new Section(
    {
        items: constants.initialCards,
        renderer: (item) => new Card(item, constants.cardSelectors, {
            fullSize: (data) => {
                const { fullImageImgElement, fullImageText } = constants.fullImageSelectors;
                document.querySelector(fullImageImgElement).src = data.src;
                document.querySelector(fullImageImgElement).alt = data.alt;
                document.querySelector(fullImageText).textContent = data.name;
                fullSizePopup.togglePopup();
            }
        }).getCard()
    },
    constants.photoList
);
cardList.renderItems();

const updateProfileForm = new PopupWithForm(constants.editSelectors.editPopup, {
    fill: (index) => {
        return constants.profileSelectors[index].textContent.trim();
    },
    submit: (popup, evt, inputs) => {
        evt.preventDefault();
        constants.profileSelectors[0].textContent = inputs[0];
        constants.profileSelectors[1].textContent = inputs[1];
        popup.togglePopup();
    }
});
updateProfileForm.setEventListeners();
document.querySelector(".profile__edit-profile").addEventListener("click", () => updateProfileForm.togglePopup());
new FormValidation(updateProfileForm.getPopupForm(), constants.formSelectors).enableValidation();

const newPostForm = new PopupWithForm(constants.newPostSelectors.newPostPopup, {
    fill: () => {return ""},
    submit: (popup, evt, inputs) => {
        evt.preventDefault();
        cardList.addItem({
            src: inputs[0],
            name: inputs[1],
            alt: inputs[1]
                .toLocaleLowerCase()
                .replace(" ", "_"),
        });
        popup.togglePopup();
    }
});
newPostForm.setEventListeners();
document.querySelector(".profile__new-post").addEventListener("click", () => newPostForm.togglePopup());
new FormValidation(newPostForm.getPopupForm(), constants.formSelectors).enableValidation();