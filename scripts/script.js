const editProfileBtn = document.querySelector('.profile__profile-button');
const addButton = document.querySelector('.profile__add-button');
const popUp = Array.from(document.querySelectorAll('.popup'));
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

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
  escapeHandler.openedModal = modal;
  if (modal.classList.contains('popup_opened')) {
      document.addEventListener('keyup', escapeHandler);
  } else {
      document.removeEventListener('keyup', escapeHandler);
  }
}

function escapeHandler(evt) {
  if (evt.key === 'Escape') {
      toggleModal(escapeHandler.openedModal);
  }
}

function showPicture(name, link) {
  popUpImagePicture.setAttribute('src', '' + link);
  popUpImageSubtitle.textContent = name;
  toggleModal(popUpImage);
}

function popUpEditToggle() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  toggleModal(popUpEdit);
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  popUpEditToggle();
}

function formNewElementSubmitHandler(evt) {
  evt.preventDefault();
  addElement(placeInput.value, linkInput.value);
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

const elementTemplate = document.querySelector('#place').content;

function addElement(name, link) {
  const newElement = elementTemplate.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image')
  newElementImage.src = link;
  newElementImage.alt = name;
  newElement.querySelector('.element__text').textContent = name;
  newElement.querySelector('.element__like-button').addEventListener('click', switchDark);
  newElement.querySelector('.element__remove-button').addEventListener('click', removeElement);
  newElement.querySelector('.element__image').addEventListener('click', () => showPicture(name, link));
  addNewElement(newElement);
}

function addNewElement(item) {
  elements.prepend(item);
}

function switchDark() {
  const clickedLike = event.target;
  clickedLike.classList.toggle('element__like-button_pressed');
}

function removeElement() {
  const clickedLike = event.target;
  clickedLike.closest('.element').remove();
}

initialCards.forEach(function(item) {
  addElement(item.name, item.link);
});







  