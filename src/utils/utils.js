export const avatarSubmitButton = document.querySelector('.popup__submit_avatar');
export const newCardSubmitButton = document.querySelector('.popup__submit_new-element');
export const editSubmitButton = document.querySelector('.popup__submit_edit');
const message = document.querySelector('.popup__message');

function renderLoading(isLoading, button) {
    if(isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}
export {renderLoading};

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
export {showErrorMessage};