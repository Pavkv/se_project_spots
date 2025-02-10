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
const newPostForm = document.forms["new-post-form"];
const photoList = document.querySelector(".photos__list");

const profileSelectors = {
    editModal: document.querySelector("#edit-modal"),
    editButton: document.querySelector(".profile__edit-profile"),
    editName: profileForm.querySelector("#edit-name"),
    editDescription: profileForm.querySelector("#edit-description"),
    profileUserName: document.querySelector(".profile__text_type_username"),
    profileDescription: document.querySelector(".profile__text_type_description"),
};

const newPostSelectors = {
    newPostModal: document.querySelector("#new-post-modal"),
    newPostButton: document.querySelector(".profile__new-post"),
    newPostImageLink: newPostForm.querySelector("#new-post-image-link"),
    newPostCaption: newPostForm.querySelector("#new-post-caption"),
};

const fullImageSelectors = {
    fullImageModal: document.querySelector("#full-image-modal"),
    fullImageImgElement: document.querySelector("#modal__full-image-img"),
    fullImageText: document.querySelector(".modal__full-image-text"),
};

const handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
        const openModal = document.querySelector(".modal.modal_opened");
        if (openModal) {
            toggleModal(openModal);
            document.activeElement.blur();
        }
    }
};

const handleMouseClickClose = (evt) => {
    const openModal = document.querySelector(".modal.modal_opened");
    if (openModal && evt.target === openModal.children[0]) {
        toggleModal(openModal);
    }
};

const addModalListeners = () => {
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("click", handleMouseClickClose);
};

const removeModalListeners = () => {
    document.removeEventListener("keydown", handleEscapeClose);
    document.removeEventListener("click", handleMouseClickClose);
};

function toggleModal(modal) {
    modal.classList.toggle("modal_opened");
    const isOpened = modal.classList.contains("modal_opened");
    isOpened ? addModalListeners() : removeModalListeners();
    if (isOpened && modal === newPostSelectors.newPostModal) {
        resetValidation(modal);
    }
}

function fillEditFormFields() {
    profileSelectors.editName.value =
        profileSelectors.profileUserName.textContent.trim();
    profileSelectors.editDescription.value =
        profileSelectors.profileDescription.textContent.trim();
}

function setProfileModalListeners() {
    profileSelectors.editButton.addEventListener("click", () => {
        fillEditFormFields();
        toggleModal(profileSelectors.editModal);
    });
}

function updateUserInformation() {
    profileForm.addEventListener("submit", (evt) => {
        profileSelectors.profileUserName.textContent =
            profileSelectors.editName.value;
        profileSelectors.profileDescription.textContent =
            profileSelectors.editDescription.value;
        toggleModal(profileSelectors.editModal);
        evt.preventDefault();
    });
}

function renderCard(data) {
    photoList.prepend(getCardElement(data));
}

function openFullImage(data) {
    fullImageSelectors.fullImageImgElement.src = "";
    fullImageSelectors.fullImageImgElement.alt = "";
    fullImageSelectors.fullImageText.textContent = "";
    toggleModal(fullImageSelectors.fullImageModal);
    fullImageSelectors.fullImageImgElement.src = data.src;
    fullImageSelectors.fullImageImgElement.alt = data.alt;
    fullImageSelectors.fullImageText.textContent = data.name;
}

function getCardElement(data) {
    const cardElement = document
        .querySelector("#card-template")
        .content.querySelector(".photos__list-item")
        .cloneNode(true);
    cardElement.querySelector(".card__text").textContent = data.name;
    const cardPhoto = cardElement.querySelector(".card__image");
    cardPhoto.src = data.src;
    cardPhoto.alt = data.alt;

    const cardElementLike = cardElement.querySelector(".card__like-button");
    cardElementLike.addEventListener("click", () =>
        cardElementLike.classList.toggle("card__like-button_active"),
    );
    const cardElementDelete = cardElement.querySelector(".card__delete-button");
    cardElementDelete.addEventListener("click", () => {
        cardElement.remove();
    });

    const cardElementFullImageButton = cardElement.querySelector(
        ".card__full-image-button",
    );
    cardElementFullImageButton.addEventListener("click", () =>
        openFullImage(data),
    );

    return cardElement;
}

function addCards() {
    initialCards.reverse().forEach((card) => renderCard(card));
}

function setNewPostListeners() {
    newPostSelectors.newPostButton.addEventListener("click", () =>
        toggleModal(newPostSelectors.newPostModal)
    );

    newPostForm.addEventListener("submit", (evt) => {
        renderCard({
            name: newPostSelectors.newPostCaption.value,
            src: newPostSelectors.newPostImageLink.value,
            alt: newPostSelectors.newPostCaption.value
                .toLocaleLowerCase()
                .replace(" ", "_"),
        });
        evt.target.reset();
        toggleModal(newPostSelectors.newPostModal);
    });
}

function setCloseButtonListeners() {
    const closeButtons = document.querySelectorAll(".modal__close");

    closeButtons.forEach((button) => {
        const modal = button.closest(".modal");
        button.addEventListener("click", () => toggleModal(modal));
    });
}

setProfileModalListeners();
setNewPostListeners();
setCloseButtonListeners();
updateUserInformation();
addCards();
