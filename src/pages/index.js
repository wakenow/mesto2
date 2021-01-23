import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


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
const message = document.querySelector('.popup__message');

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

function createCard(item) {
    const card = new Card(item, '#place', userData._id, handlePreviewPicture, deleteCardHandler, likeHandler);
    const cardElement = card.renderCard(); 
    cardsGrid.addItem(cardElement); 
}; 

function handlePreviewPicture(name, link) {
    imagePopup.open(name, link);
}

function openEditProfileModal() {
    editModal.open();
    const userData = userConfig.getUserInfo();
    nameInput.value = userData.name;
    bioInput.value = userData.bio;
    setTimeout(function() {
        popupFormSelector.focus();
    }, 100);
}

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((item) => {
    const validator = new FormValidator(validationConfig, item);
    validator.enableValidation();
    item.validator = validator;
});

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
               createCard(item);
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
            newCardModal.submitButton.classList.add('popup__submit_disabled');
            newCardModal.open()
        });
        userAvatar.addEventListener('click', () => {
            avatarModal.submitButton.disabled = true;
            avatarModal.submitButton.classList.add('popup__submit_disabled');
            avatarModal.open()
        });
    })
    .catch((err) => {
        showErrorMessage(err);
        console.log(err);
    });


function formAvatarSubmitHandler(data) {
    avatarModal.submitButton.textContent = 'Сохранение...';
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
            avatarModal.submitButton.textContent = 'Сохранить';
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
    editModal.submitButton.textContent = 'Сохранение...'
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
            editModal.submitButton.textContent = 'Сохранить';
            this.close();
        })
}

function formNewCardSubmitHandler(data) {
    newCardModal.submitButton.textContent = 'Сохранение...'
    api.addCard(data.place, data.link)
        .then((res) => {
            console.log(res);
            createCard(res);
            this.close();
        })
        .catch((err) => {
            showErrorMessage(err);
            console.log(err);
        })
        .finally(() => {
            newCardModal.submitButton.textContent = 'Сохранить';
        })
}

function showErrorMessage(text) {
    message.textContent = text;
    message.parentElement.classList.add('popup_opened');
    setTimeout(() => {
        message.textContent = '';
    }, 2000);
    setTimeout(() => {
        message.parentElement.classList.remove('popup_opened');
    }, 2200);

}

