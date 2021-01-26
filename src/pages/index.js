import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {newCardSubmitButton, avatarSubmitButton, editSubmitButton, renderLoading, showErrorMessage} from '../utils/utils.js';


const validationConfig = {
    formSelector: '.popup__forms_type_input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__form_type_error',
    errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__profile-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditContainer = popupEdit.querySelector('.popup__forms');
const userAvatar = document.querySelector('.profile__avatar');

const nameInput = document.querySelector('.popup__form_type_name');
const bioInput = document.querySelector('.popup__form_type_bio');
let userData = {};

const apiConfig = {
    userURL: 'https://mesto.nomoreparties.co/v1/cohort-17/users/me',
    cardsURL: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
    token: '9c5efa47-3aee-400f-b0b8-aef1a353a938'
}

const userConfig = new UserInfo ({
    nameSelector: '.profile__name',
    bioSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage('.popup_type_image');
const editModal = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const newCardModal = new PopupWithForm('.popup_type_new-element', formNewCardSubmitHandler);
const confirmModal = new PopupWithForm('.popup_type_confirm', formConfirmSubmitHandler);
const avatarModal = new PopupWithForm('.popup_type_avatar', formAvatarSubmitHandler);
const api = new Api(apiConfig);
const popupFormSelector = popupEditContainer.querySelector('.popup__form');
const place = '#place';

function createCard(item) {
    const card = new Card(item, place, userData._id, handlePreviewPicture, deleteCardHandler, likeHandler);
    return card;
}; 

function handlePreviewPicture(name, link) {
    imagePopup.open(name, link);
}

function openEditProfileModal() {
    editModal.open();
    formNewCardSubmitValidator.clearErrors();
    const userData = userConfig.getUserInfo();
    nameInput.value = userData.name;
    bioInput.value = userData.bio;
    setTimeout(function() {
        popupFormSelector.focus();
    }, 100);
}

const formAvatarSubmitValidator = new FormValidator(validationConfig, avatarModal._form);
formAvatarSubmitValidator.enableValidation();
const formEditSubmitValidator = new FormValidator(validationConfig, newCardModal._form);
formEditSubmitValidator.enableValidation();
const formNewCardSubmitValidator = new FormValidator(validationConfig, popupEditContainer);
formNewCardSubmitValidator.enableValidation();

let cardsGrid = {};
const userFromServer = api.getUserData();
const cardsFromServer = api.getInitialCards();

const dataDownload = [userFromServer, cardsFromServer];
Promise.all(dataDownload)
    .then((data) => {
        userData = data[0];
        const cardsData = data[1];
        userConfig.setUserInfo({ "name": userData.name, "bio": userData.about });
        userAvatar.src = userData.avatar;
        cardsGrid = new Section({
            items: cardsData,
            renderer: (item) => {
                const cardElement = createCard(item).renderCard(item); 
                cardsGrid.addItem(cardElement); 
            }
        }, '.elements');
        cardsGrid.renderItems();
        
        imagePopup.setEventListeners();
        editModal.setEventListeners();
        newCardModal.setEventListeners();
        confirmModal.setEventListeners();
        avatarModal.setEventListeners();
        
        editButton.addEventListener('click', openEditProfileModal);
        addButton.addEventListener('click', () => {
            console.log(newCardModal);
            newCardModal.submitButton.disabled = true;
            newCardModal.submitButton.classList.add(validationConfig.inactiveButtonClass);
            newCardModal.open()
            formEditSubmitValidator.clearErrors();
        });
        userAvatar.addEventListener('click', () => {
            avatarModal.submitButton.disabled = true;
            avatarModal.submitButton.classList.add(validationConfig.inactiveButtonClass);
            avatarModal.open()
            formAvatarSubmitValidator.clearErrors();
        });
    })
    .catch((err) => {
        showErrorMessage(err);
        console.log(err);
    });

function formAvatarSubmitHandler(data) {
    renderLoading(true, avatarSubmitButton);
    console.log(data);
    api.avatarUpload(data)
        .then((res) => {
            userConfig.setAvatar(res.avatar);
        })
        .catch(err => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, avatarSubmitButton);
            this.close();
        })

}

function deleteCardHandler(id, evt) {
    confirmModal.cardToDeleteID = id;
    confirmModal.cardToDeleteElement = evt.target.parentElement;
    confirmModal.open();
}

function formConfirmSubmitHandler() {
    api.deleteCard(confirmModal.cardToDeleteID)
        .then(res => {
            console.log(res);
            confirmModal.cardToDeleteElement.remove();
        })
        .catch(err => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            this.close();
        })

}


function likeHandler(id, evt) {
    if (evt.target.classList.contains('element__like-button_pressed')) {
        api.dislikeCard(id)
            .then((res) => {
                evt.target.nextElementSibling.textContent = res.likes.length;
                evt.target.classList.remove('element__like-button_pressed');
            })
            .catch((err) => {
                showErrorMessage(err);
                console.log(err);
            })
    } else {
        api.likeCard(id)
            .then((res) => {
                evt.target.nextElementSibling.textContent = res.likes.length;
                evt.target.classList.add('element__like-button_pressed');
            })
            .catch((err) => {
                showErrorMessage(err);
                console.log(err);
            })
    }
}

function formEditSubmitHandler(data) {
    renderLoading(true, editSubmitButton)
    api.uploadUserProfileData(data.name, data.bio)
        .then((res) => {
            console.log(res);
            userConfig.setUserInfo({ name: res.name, bio: res.about });
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, editSubmitButton)
            this.close();
        })
}

function formNewCardSubmitHandler(data) {
    renderLoading(true, newCardSubmitButton)
    api.addCard(data.place, data.link)
        .then((res) => {
            console.log(res);
            const cardElement = createCard(res).renderCard(res); 
            cardsGrid.addItem(cardElement); 
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, newCardSubmitButton)
            this.close();
        })
}



