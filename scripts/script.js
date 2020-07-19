const editProfileBtn = document.querySelector('.profile__profile-button');
const closePopUpBtn = document.querySelector('.popup__close-button');
const popUp = document.querySelector('.edit-form');
const nameInput = document.querySelector('.popup__name-form');
const jobInput = document.querySelector('.popup__bio-form');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__subtitle');
const submitButton = document.querySelector('.popup__submit');


function openPopUp() {
    popUp.classList.add('edit-form_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileBio.textContent;
  }
  
  function closePopUp() {
    popUp.classList.remove('edit-form_opened');
  }
  editProfileBtn.addEventListener('click', openPopUp);
  closePopUpBtn.addEventListener('click', closePopUp);

  let formElement = document.querySelector('.popup__container');

  function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    closePopUp();
  }

  formElement.addEventListener('submit', formSubmitHandler);
  submitButton.addEventListener('click', formSubmitHandler);
  