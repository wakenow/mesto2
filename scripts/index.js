import FormValidator from './FormValidator.js';
import Card from './Card.js';


const validationList = {
  formSelector: '.popup__forms_type_input',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__error_visible'
};

const editProfileBtn = document.querySelector('.profile__profile-button');
const addButton = document.querySelector('.profile__add-button');
const popUps = Array.from(document.querySelectorAll('.popup'));
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpEditForm = popUpEdit.querySelector('.popup__forms');
const closeEditPopUpBtn = popUpEdit.querySelector('.popup__close-button');
const popUpNewElement = document.querySelector('.popup_type_new-element');
const popUpNewElementForm = popUpNewElement.querySelector('.popup__forms');
const popUpNewElementCloseBtn = popUpNewElement.querySelector('.popup__close-button');
const popUpImage = document.querySelector('.popup_type_image');
const popUpImagePicture = popUpImage.querySelector('.popup__image');
const popUpImageCloseBtn = popUpImage.querySelector('.popup__close-button');
const popUpImageSubtitle = popUpImage.querySelector('.popup__subtitle');
const elements = document.querySelector('.elements');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__subtitle');
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


function showPicture(name, link) {
  popUpImagePicture.setAttribute('src', '' + link);
  popUpImagePicture.setAttribute('alt', '' + name);
  popUpImageSubtitle.textContent = name;
  toggleModal(popUpImage);
}

function addNewElement(item) {
  elements.prepend(item);
}

function addNewCard(item) {
  elements.prepend(item);
}

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
  escapeHandler.openedModal = modal;
  const openedContainer = modal.querySelector('.popup__forms');
  const modalContainsForm = openedContainer.classList.contains('popup__forms_type_input');
  if (modal.classList.contains('popup_opened')) {
      document.addEventListener('keyup', escapeHandler);
      if (modalContainsForm) {
          setTimeout(function() { openedContainer.querySelector('.popup__form').focus(); }, 100);
      }
  } else {
      document.removeEventListener('keyup', escapeHandler);
      if (modalContainsForm) {
          openedContainer.validator.clearErrors();
          openedContainer.reset();
      };
  }
}

function escapeHandler(evt) {
  if (evt.key === 'Escape') {
      toggleModal(escapeHandler.openedModal);
  }
}

function popUpEditToggle() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  toggleModal(popUpEdit);
}

function formEditSubmitHandler() {
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  popUpEditToggle();
}

function formNewElementSubmitHandler() {
  const element = new Card({ name: placeInput.value, link: linkInput.value }, '#place', showPicture);
  const newElement = element.renderElement();
  addNewElement(newElement);
  placeInput.value = '';
  linkInput.value = '';
  toggleModal(popUpNewElement);
}

editProfileBtn.addEventListener('click', popUpEditToggle);
addButton.addEventListener('click', () => toggleModal(popUpNewElement));

closeEditPopUpBtn.addEventListener('click', popUpEditToggle);
popUpNewElementCloseBtn.addEventListener('click', () => toggleModal(popUpNewElement));
popUpImageCloseBtn.addEventListener('click', () => toggleModal(popUpImage));

popUpEditForm.addEventListener('submit', formEditSubmitHandler);
popUpNewElementForm.addEventListener('submit', formNewElementSubmitHandler);

initialCards.forEach(function(item) {
  const element = new Card(item, '#place', showPicture);
  const newCard = element.renderElement();
  addNewCard(newCard);
});

const formList = Array.from(document.querySelectorAll(validationList.formSelector));
formList.forEach((item) => {
  const validator = new FormValidator(validationList, item);
  validator.enableValidation();
  item.validator = validator;
});

popUps.forEach((item) => {
  item.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          toggleModal(evt.target);
      }
  });
});




  