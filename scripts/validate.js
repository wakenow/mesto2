const validationList = {
    formSelector: '.popup__forms_type_input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__form_type_error',
    errorClass: 'popup__error_visible'
};

function showError(formElement, inputElement, errorText) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(showError.inputErrorClass);
    errorElement.classList.add(showError.errorClass);
    errorElement.textContent = errorText;
}

function removeError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(removeError.inputErrorClass);
    errorElement.classList.remove(removeError.errorClass);
    errorElement.textContent ='';
}

function checkValidation(formElement, inputElement) {
    if (inputElement.validity.valid) {
        removeError(formElement, inputElement);
    } else {
        showError(formElement, inputElement, inputElement.validationMessage);
    }
}

function eventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(eventListeners.inputSelector));
    const buttonElement = formElement.querySelector(eventListeners.submitButtonSelector);
    toggleBtn(inputList, buttonElement);
    inputList.forEach((item) => {
        item.addEventListener('input', () => {
            checkValidation(formElement, item);
            toggleBtn(inputList, buttonElement);
        });
     });
}

function enableValidation(validationItems) {
    const {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = validationItems;


    eventListeners.inputSelector = inputSelector;
    eventListeners.submitButtonSelector = submitButtonSelector;
    showError.inputErrorClass = inputErrorClass;
    showError.errorClass = errorClass;
    removeError.inputErrorClass = inputErrorClass;
    removeError.errorClass = errorClass;
    toggleBtn.inactiveButtonClass = inactiveButtonClass;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((item) => {
    eventListeners(item);
    });
}

function invalidInput(inputList) {
    if (inputList.some(item => !item.validity.valid)) {
        return true;
    } else {
        return false;
    }
}

function toggleBtn(inputList, buttonElement) {
    if (invalidInput(inputList)) {
        buttonElement.classList.add(toggleBtn.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(toggleBtn.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}
enableValidation(validationList);