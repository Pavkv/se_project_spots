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
    }
];

const profileForm = document.forms["profile-form"];
const photoList = document.querySelector(".photos__list");

const profileSelectors = {
    editModal: document.querySelector("#edit-modal"),
    editName: profileForm.querySelector("#edit-name"),
    editDescription: profileForm.querySelector("#edit-description"),
    profileUserName: document.querySelector(".profile__text_type_username"),
    profileDescription: document.querySelector(".profile__text_type_description")
}

function toggleProfileModal() {
    profileSelectors["editModal"].classList.toggle("modal_opened");
}

function fillEditFormFields() {
    profileSelectors["editName"].value = profileSelectors["profileUserName"].textContent;
    profileSelectors["editDescription"].value = profileSelectors["profileDescription"].textContent;
}

function setProfileModalListeners() {
    fillEditFormFields();
    const editButton = document.querySelector(".profile__edit-profile");
    const editModalClose = profileSelectors["editModal"].querySelector(".modal__header-closebutton");

    editButton.addEventListener("click", () => {
        toggleProfileModal();
    });

    editModalClose.addEventListener("click", () => {
        toggleProfileModal();
    });
}

function updateUserInformation () {
    profileForm.addEventListener("submit", (evt) => {
        profileSelectors["profileUserName"].textContent = profileSelectors["editName"].value;
        profileSelectors["profileDescription"].textContent = profileSelectors["editDescription"].value;
        toggleProfileModal();
        evt.preventDefault();
    });
}

function renderCard(data) {
    photoList.append(getCardElement(data));
}

function getCardElement(data) {
    const cardElement = document.querySelector("#card-template").
    content.querySelector(".photos__list-item").cloneNode(true);
    cardElement.querySelector(".card__text").textContent = data.name;
    const cardPhoto = cardElement.querySelector(".card__photo");
    cardPhoto.src = data.src;
    cardPhoto.alt = data.alt;
    return cardElement;
}

function addCards () {
    for (let card of initialCards) {
        renderCard(card);
    }
}

setProfileModalListeners();
updateUserInformation();
addCards();