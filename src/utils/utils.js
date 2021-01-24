export const avatarSubmitButton = document.querySelector('.popup__submit_avatar');
export const newCardSubmitButton = document.querySelector('.popup__submit_new-element');
export const editSubmitButton = document.querySelector('.popup__submit_edit');

function renderLoading(isLoading, button) {
    if(isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}
export {renderLoading};