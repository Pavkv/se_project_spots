const initialCards = {
    1: {
        name: "Trevi Fountain",
        link: "../images/photo1-Trevi-Fountain.jpg"
    },
    2: {
        name: "Fiorenze",
        link: "../images/photo2-Fiorenze.jpg"
    },
    3: {
        name: "Street View",
        link: "../images/photo3-Street-View.jpg"
    },
    4: {
        name: "River View",
        link: "../images/photo4-River-View.jpg"
    },
    5: {
        name: "Cafe",
        link: "../images/photo5-Cafe.jpg"
    },
    6: {
        name: "Riviera",
        link: "../images/photo6-Riviera.jpg"
    }
}

let editButton = document.querySelector(".profile__edit-profile");
let editModal = document.querySelector("#edit-modal");

editButton.addEventListener("click", function(){
    editModal.classList.add("modal_opened");
});

let editModalClose = editModal.querySelector(".modal__header-closebutton");

editModalClose.addEventListener("click", function() {
    editModal.classList.remove("modal_opened");
})