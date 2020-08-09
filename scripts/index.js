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

function showPicture(name, link) {
  popUpImagePicture.setAttribute('src', '' + link);
  popUpImageSubtitle.textContent = name;
  toggleModal(popUpImage);
}

const elementTemplate = document.querySelector('#place').content;

function addElement(name, link) {
  const newElement = elementTemplate.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image')
  newElementImage.src = link;
  newElementImage.alt = name;
  newElement.querySelector('.element__text').textContent = name;
  newElement.querySelector('.element__like-button').addEventListener('click', switchDark);
  newElement.querySelector('.element__remove-button').addEventListener('click', removeElement);
  newElementImage.addEventListener('click', () => showPicture(name, link));
  return newElement;
}

function addNewElement(item) {
  elements.prepend(item);
}

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
  escapeHandler.openedModal = modal;
  if (modal.classList.contains('popup_opened')) {
      document.addEventListener('keyup', escapeHandler);
  } else {
      document.removeEventListener('keyup', escapeHandler);
      const openedForm = modal.querySelector('.popup__forms');
      if (openedForm.classList.contains('popup__forms_type_input')) {
        clearErrors(openedForm);
      };
  }
}

function clearErrors(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__form'));
  const submitButton = form.querySelector('.popup__submit');
  inputList.forEach((item) => { removeError(form, item); });
  toggleBtn(inputList, submitButton);
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

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  popUpEditToggle();
}

function formNewElementSubmitHandler(evt) {
  evt.preventDefault();
  const newElement = addElement(placeInput.value, linkInput.value);
  addNewElement(newElement);
  placeInput.value = '';
  linkInput.value = '';
  toggleModal(popUpNewElement);
}

function switchDark(evt) {
  const clickedLike = evt.target;
  clickedLike.classList.toggle('element__like-button_pressed');
}

function removeElement(evt) {
  const clickedLike = evt.target;
  clickedLike.closest('.element').remove();
}

editProfileBtn.addEventListener('click', popUpEditToggle);
addButton.addEventListener('click', () => toggleModal(popUpNewElement));

closeEditPopUpBtn.addEventListener('click', popUpEditToggle);
popUpNewElementCloseBtn.addEventListener('click', () => toggleModal(popUpNewElement));
popUpImageCloseBtn.addEventListener('click', () => toggleModal(popUpImage));

popUpEditForm.addEventListener('submit', formEditSubmitHandler);
popUpNewElementForm.addEventListener('submit', formNewElementSubmitHandler);

initialCards.forEach(function(item) {
  const newElement = addElement(item.name, item.link);
  addNewElement(newElement);
});

popUp.forEach((item) => {
  item.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          toggleModal(evt.target);
      }
  });
});




  