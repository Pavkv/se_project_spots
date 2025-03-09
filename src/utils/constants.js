const shortLink = "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/";

const initialCards = [
    { name: "Val Thorens", src: `${shortLink}1-photo-by-moritz-feldmann-from-pexels.jpg`, alt: "Ski resort view" },
    { name: "Restaurant terrace", src: `${shortLink}2-photo-by-ceiline-from-pexels.jpg`, alt: "Restaurant view" },
    { name: "An outdoor cafe", src: `${shortLink}3-photo-by-tubanur-dogan-from-pexels.jpg`, alt: "An outdoor cafe view" },
    { name: "A very long bridge, over the forest and through the trees", src: `${shortLink}4-photo-by-maurice-laschet-from-pexels.jpg`, alt: "Forest wooden bridge view" },
    { name: "Tunnel with morning light", src: `${shortLink}5-photo-by-van-anh-nguyen-from-pexels.jpg`, alt: "Long hallway view" },
    { name: "Mountain house", src: `${shortLink}6-photo-by-moritz-feldmann-from-pexels.jpg`, alt: "Winter cabin view" },
    { name: "Golden Gate Bridge", src: `${shortLink}7-photo-by-griffin-wooldridge-from-pexels.jpg`, alt: "Golden gate bridge view" },
];

const photoList = ".photos__list";

const cardSelectors = {
    cardItem: ".photos__list-item",
    cardTemplate: "#card-template",
    cardText: ".card__text",
    cardPhoto: ".card__image",
    cardLike: ".card__like-button",
    cardLikeActive: "card__like-button_active",
    cardDelete: ".card__delete-button",
    cardFull: ".card__full-image-button"
};

const editSelectors = {
    editPopup: "#edit-popup",
    editButton: ".profile__edit-profile",
    editName: "#edit-name",
    editDescription: "#edit-description"
};

const formSelectors = {
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorSelector: ".form__input",
    inputErrorClass: "form__input-error",
    errorSelector: ".form__error",
    errorClass: "form__error_visible"
};

const profileSelectors = [
    document.querySelector(".profile__text_type_username"),
    document.querySelector(".profile__text_type_description")
];

const newPostSelectors = {
    newPostPopup: "#new-post-popup",
    newPostButton: ".profile__new-post",
    newPostImageLink: "#new-post-image-link",
    newPostCaption: "#new-post-caption"
};

const fullImageSelectors = {
    fullImagePopup: "#full-image-popup",
    fullImageImgElement: "#popup__full-image-img",
    fullImageText: ".popup__full-image-text"
};

module.exports = { initialCards, photoList, cardSelectors, editSelectors, formSelectors, profileSelectors, newPostSelectors, fullImageSelectors };