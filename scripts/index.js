import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


const validationConfig = {
    formSelector: '.popup__forms_type_input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__form_type_error',
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

//создаем экземпляры классов
const user = new UserInfo({ nameSelector: '.profile__name', bioSelector: '.profile__subtitle' });
const imagePopup = new PopupWithImage('.popup_type_image');
const editModal = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const newCardModal = new PopupWithForm('.popup_type_new-element', formNewCardSubmitHandler);

//навешиваем слушатели
imagePopup.setEventListeners();
editModal.setEventListeners();
newCardModal.setEventListeners();


//функции открытия модальных окон
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

//функции - обработчики сабмитов
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

//создание первоначальной сетки с карточками
const cardsGrid = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#place', handlePreviewPicture);
        const cardElement = card.renderCard();
        cardsGrid.insertItem(cardElement);
    }
}, '.elements');
cardsGrid.renderItems();

//создание экземпляров класса FormValidator на каждой форме и привязка к форме
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((item) => {
    const validator = new FormValidator(validationConfig, item);
    validator.enableValidation();
    item.validator = validator;
});

//установка слушателей на кнопки редактирования профиля и добавления карточки
editProfileBtn.addEventListener('click', openEditModal);
addButton.addEventListener('click', () => { newCardModal.open() });