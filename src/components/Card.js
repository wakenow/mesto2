export default class Card {
    constructor(data, templateSelector, popupHandler) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupHandler = popupHandler;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return cardElement;
    }

    _handleLikeButton(evt) {
        const clickedItem = evt.target;
        clickedItem.classList.toggle('element__like-button_pressed');
    }

    _deleteCard(evt) {
        const clickedItem = evt.target;
        clickedItem.parentElement.remove();
    }
    _setEventListeners(cardImage) {
        this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeButton);
        this._element.querySelector('.element__remove-button').addEventListener('click', this._deleteCard);
        cardImage.addEventListener('click', () => this._popupHandler(this._name, this._link));
    }

    renderCard() {
        this._element = this._getTemplate();
        const newCardImage = this._element.querySelector('.element__image');
        newCardImage.src = this._link;
        newCardImage.alt = this._name;
        this._setEventListeners(newCardImage);
        this._element.querySelector('.element__text').textContent = this._name;
        return this._element;
    }
}