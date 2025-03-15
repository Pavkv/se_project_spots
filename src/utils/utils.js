const {profileSelectors} = require("./constants");

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

const editUserInfo = (name, about, avatar) => {
    if (name && about) {
        profileSelectors.profileUserName.textContent = name;
        profileSelectors.profileDescription.textContent = about;
    }
    if (avatar) {
        profileSelectors.profileAvatar.src = avatar
    }
};

const animateText = (button, text) => {
    let dots = "";
    return setInterval(() => {
        dots = dots.length < 3 ? dots + "." : "";
        button.textContent = `${text}ing${dots}`;
    }, 500);
};

const submitButtonText = (button) => {
    const originalText = button.textContent.trim();
    return {
        loadingAnimation: animateText(button, originalText.substring(0, originalText.length - 1)),
        originalText
    };
};

const handleSubmit = (evt, popup, button, request) => {
    evt.preventDefault();
    const { loadingAnimation, originalText } = submitButtonText(button);
    setTimeout(() => {
        request().then(() => {
            togglePopup(popup);
            if (evt.submitter) {
                evt.target.reset();
            }
        }).catch(err => console.log(err)).
        finally(() => {
            clearInterval(loadingAnimation);
            button.textContent = originalText;
        });
    }, 3000);
};

module.exports = { editUserInfo, handleSubmit, togglePopup };