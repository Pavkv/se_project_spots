const shortLink = "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/"
const initialCards = [
    {
        name: "Val Thorens",
        src: shortLink + "1-photo-by-moritz-feldmann-from-pexels.jpg",
        alt: "Ski resort view"
    },
    {
        name: "Restaurant terrace",
        src: shortLink + "2-photo-by-ceiline-from-pexels.jpg",
        alt: "Restaurant view"
    },
    {
        name: "An outdoor cafe",
        src: shortLink + "3-photo-by-tubanur-dogan-from-pexels.jpg",
        alt: "An outdoor cafe view"
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        src: shortLink + "4-photo-by-maurice-laschet-from-pexels.jpg",
        alt: "Forest wooden bridge view"
    },
    {
        name: "Tunnel with morning light",
        src: shortLink + "5-photo-by-van-anh-nguyen-from-pexels.jpg",
        alt: "Long hallway view"
    },
    {
        name: "Mountain house",
        src: shortLink + "6-photo-by-moritz-feldmann-from-pexels.jpg",
        alt: "Winter cabin view"
    },
    {
        name: "Golden Gate Bridge",
        src: shortLink + "7-photo-by-griffin-wooldridge-from-pexels.jpg",
        alt: "Golden gate bridge view"
    }
];

const profileForm = document.forms["profile-form"];
const newPostForm = document.forms["new-post-form"];
const photoList = document.querySelector(".photos__list");
const fullImageModal = document.querySelector("#full-image-modal");
const fullImageImgElement = fullImageModal.querySelector("#modal__full-image-img");

const profileSelectors = {
    editModal: document.querySelector("#edit-modal"),
    editButton: document.querySelector(".profile__edit-profile"),
    editName: profileForm.querySelector("#edit-name"),
    editDescription: profileForm.querySelector("#edit-description"),
    profileUserName: document.querySelector(".profile__text_type_username"),
    profileDescription: document.querySelector(".profile__text_type_description")
}

const newPostSelectors = {
    newPostModal: document.querySelector("#new-post-modal"),
    newPostButton: document.querySelector(".profile__new-post"),
    newPostImageLink: newPostForm.querySelector("#new-post-image-link"),
    newPostCaption: newPostForm.querySelector("#new-post-caption")
}

function toggleModal(modal) {
    modal.classList.toggle("modal_opened");
}

function fillEditFormFields() {
    profileSelectors["editName"].value = profileSelectors["profileUserName"].textContent;
    profileSelectors["editDescription"].value = profileSelectors["profileDescription"].textContent;
}

function setProfileModalListeners() {
    const editModalClose = profileSelectors["editModal"].querySelector("#edit-close");

    profileSelectors["editButton"].addEventListener("click", () => {
        fillEditFormFields();
        toggleModal(profileSelectors["editModal"]);
    });
    editModalClose.addEventListener("click", () => toggleModal(profileSelectors["editModal"]));
}

function updateUserInformation () {
    profileForm.addEventListener("submit", (evt) => {
        profileSelectors["profileUserName"].textContent = profileSelectors["editName"].value;
        profileSelectors["profileDescription"].textContent = profileSelectors["editDescription"].value;
        toggleModal(profileSelectors["editModal"]);
        evt.preventDefault();
    });
}

function renderCard(data) {
    photoList.append(getCardElement(data));
}

function openFullImage(data) {
    toggleModal(fullImageModal);
    fullImageImgElement.src = data.src;
    fullImageImgElement.alt = data.alt;
    fullImageModal.querySelector(".modal__full-image-text").textContent = data.name;
}

function setFullImageModalListeners() {
    fullImageModal.querySelector(".modal__full-image-close-button").
    addEventListener("click",() => {
        toggleModal(fullImageModal);
        fullImageImgElement.src = "";
        fullImageImgElement.alt = "";
        fullImageModal.querySelector(".modal__full-image-text").textContent = "";
    });
}

function getCardElement(data) {
    const cardElement = document.querySelector("#card-template").
    content.querySelector(".photos__list-item").cloneNode(true);
    cardElement.querySelector(".card__text").textContent = data.name;
    const cardPhoto = cardElement.querySelector(".card__image");
    cardPhoto.src = data.src;
    cardPhoto.alt = data.alt;

    const cardElementLike = cardElement.querySelector(".card__like-button");
    cardElementLike.addEventListener("click", () => cardElementLike.classList.toggle("active"));

    const cardElementFullImageButton = cardElement.querySelector(".card__full-image-button");
    cardElementFullImageButton.addEventListener("click", () => openFullImage(data));

    return cardElement;
}

function addCards () {
    initialCards.forEach((card) => renderCard(card));
}

function setNewPostListeners() {
    const newPostModalClose = newPostSelectors["newPostModal"].querySelector("#new-post-close");

    newPostSelectors["newPostButton"].addEventListener("click", () => toggleModal(newPostSelectors["newPostModal"]));
    newPostModalClose.addEventListener("click", () => toggleModal(newPostSelectors["newPostModal"]));

    newPostForm.addEventListener("submit", (evt) => {
        renderCard({
            name: newPostSelectors["newPostCaption"].value,
            src: newPostSelectors["newPostImageLink"].value,
            alt: newPostSelectors["newPostCaption"].value.toLocaleLowerCase().replace(" ", "_")
        });
        toggleModal(newPostSelectors["newPostModal"]);
        evt.preventDefault();
    });
}

setProfileModalListeners();
setNewPostListeners();
setFullImageModalListeners();
updateUserInformation();
addCards();