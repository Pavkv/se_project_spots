const shortLink =
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/";
const initialCards = [
    {
        name: "Val Thorens",
        src: shortLink + "1-photo-by-moritz-feldmann-from-pexels.jpg",
        alt: "Ski resort view",
    },
    {
        name: "Restaurant terrace",
        src: shortLink + "2-photo-by-ceiline-from-pexels.jpg",
        alt: "Restaurant view",
    },
    {
        name: "An outdoor cafe",
        src: shortLink + "3-photo-by-tubanur-dogan-from-pexels.jpg",
        alt: "An outdoor cafe view",
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        src: shortLink + "4-photo-by-maurice-laschet-from-pexels.jpg",
        alt: "Forest wooden bridge view",
    },
    {
        name: "Tunnel with morning light",
        src: shortLink + "5-photo-by-van-anh-nguyen-from-pexels.jpg",
        alt: "Long hallway view",
    },
    {
        name: "Mountain house",
        src: shortLink + "6-photo-by-moritz-feldmann-from-pexels.jpg",
        alt: "Winter cabin view",
    },
    {
        name: "Golden Gate Bridge",
        src: shortLink + "7-photo-by-griffin-wooldridge-from-pexels.jpg",
        alt: "Golden gate bridge view",
    },
];

const profileForm = document.forms["profile-form"];
const editAvatarForm = document.forms["edit-avatar-form"];
const newPostForm = document.forms["new-post-form"];
const cardList = document.querySelector(".photos__list");

const profileSelectors = {
    editPopup: document.querySelector("#edit-popup"),
    editButton: document.querySelector(".profile__edit-profile"),
    editName: profileForm.querySelector("#edit-name"),
    editDescription: profileForm.querySelector("#edit-description"),
    profileUserName: document.querySelector(".profile__text_type_username"),
    profileDescription: document.querySelector(".profile__text_type_description"),
    profileAvatar: document.querySelector(".profile__avatar-image"),
};

const newPostSelectors = {
    newPostPopup: document.querySelector("#new-post-popup"),
    newPostButton: document.querySelector(".profile__new-post"),
    newPostImageLink: newPostForm.querySelector("#new-post-image-link"),
    newPostCaption: newPostForm.querySelector("#new-post-caption")
};

const fullImageSelectors = {
    fullImagePopup: document.querySelector("#full-image-popup"),
    fullImageImgElement: document.querySelector("#popup__full-image-img"),
    fullImageText: document.querySelector(".popup__full-image-text")
};

const editAvatarSelectors = {
    editAvatarPopup: document.querySelector("#edit-avatar-popup"),
    editAvatarButton: document.querySelector(".profile__edit-avatar"),
    editAvatarLink: document.querySelector("#edit-avatar-link")
};

const deleteCardSelectors = {
    deleteCardPopup: document.querySelector("#delete-card-popup"),
    deleteCardButtonDelete: document.querySelector(".popup__button_delete-card"),
    deleteCardButtonCancel: document.querySelector(".popup__button_cancel-delete-card")
}

module.exports = { initialCards, profileForm, editAvatarForm, newPostForm, cardList, profileSelectors, newPostSelectors, fullImageSelectors, editAvatarSelectors, deleteCardSelectors };