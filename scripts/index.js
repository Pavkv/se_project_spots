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

const editSelectors = {
    editModal: document.querySelector("#edit-modal"),
    editName: document.querySelector("#edit-name"),
    editDescription: document.querySelector("#edit-description")
}

const profileSelectors = {
    profileUserName: document.querySelector(".profile__text_type_username"),
    profileDescription: document.querySelector(".profile__text_type_description")
}

function toggleEditModal() {
    const editButton = document.querySelector(".profile__edit-profile");
    const editModalClose = editSelectors["editModal"].querySelector(".modal__header-closebutton");

    editButton.addEventListener("click", function(){
        editSelectors["editModal"].classList.toggle("modal_opened");
    });

    editModalClose.addEventListener("click", function() {
        editSelectors["editModal"].classList.toggle("modal_opened");
    });
}

function fillEditFormFields() {
    editSelectors["editName"].value = profileSelectors["profileUserName"].textContent;
    editSelectors["editDescription"].value = profileSelectors["profileDescription"].textContent;
}

function updateUserInformation () {
    const profileSaveInformation = editSelectors["editModal"].querySelector(".modal__form");
    profileSaveInformation.addEventListener("submit", function (evt) {
        profileSelectors["profileUserName"].textContent = editSelectors["editName"].value;
        profileSelectors["profileDescription"].textContent = editSelectors["editDescription"].value;
        editSelectors["editModal"].classList.toggle("modal_opened");
        evt.preventDefault();
    });
}

function getCardElement(data) {
    let cardElement = document.querySelector("#card-template").
    content.querySelector(".photos__list-item").cloneNode(true);
    cardElement.querySelector(".card__text").textContent = data.name;
    cardElement.querySelector(".card__photo").src = data.src;
    cardElement.querySelector(".card__photo").alt = data.alt;
    document.querySelector(".photos__list").append(cardElement);
}

function addCards () {
    for (let card of initialCards) {
        getCardElement(card);
    }
}

toggleEditModal();
fillEditFormFields();
updateUserInformation();
addCards();