import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const validationConfig = {
    formSelector: '.popup__forms_type_input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_visible'
};

const editProfileBtn = document.querySelector('.profile__profile-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpEditForm = popUpEdit.querySelector('.popup__forms');

const nameInput = document.querySelector('.popup__form_type_name');
const jobInput = document.querySelector('.popup__form_type_bio');
const placeInput = document.querySelector('.popup__form_type_place');
const linkInput = document.querySelector('.popup__form_type_link');


const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];


const user = new UserInfo({ nameSelector: '.profile__name', bioSelector: '.profile__subtitle' });
const imagePopup = new PopupWithImage('.popup_type_image');
const editModal = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const newCardModal = new PopupWithForm('.popup_type_new-element', formNewCardSubmitHandler);


imagePopup.setEventListeners();
editModal.setEventListeners();
newCardModal.setEventListeners();



function handlePreviewPicture(name, link) {
    imagePopup.open(name, link);
}

function openEditModal() {
  editModal.open();
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.bio;
  setTimeout(function() {
      popUpEditForm.querySelector('.popup__form').focus();
  }, 100);
}


function formEditSubmitHandler(data) {
    user.setUserInfo(data);
    this.close();
}

function formNewCardSubmitHandler(data) {
    const card = new Card({ name: data.place, link: data.link }, '#place', handlePreviewPicture);
    const cardElement = card.renderCard();
    cardsGrid.insertItem(cardElement);
    placeInput.value = '';
    linkInput.value = '';
    this.close();
}


const cardsGrid = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#place', handlePreviewPicture);
        const cardElement = card.renderCard();
        cardsGrid.insertItem(cardElement);
    }
}, '.elements');
cardsGrid.renderItems();


const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((item) => {
    const validator = new FormValidator(validationConfig, item);
    validator.enableValidation();
    item.validator = validator;
});


editProfileBtn.addEventListener('click', openEditModal);
addButton.addEventListener('click', () => { newCardModal.open() });