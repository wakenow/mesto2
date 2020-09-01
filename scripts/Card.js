export default class Card {
    constructor(data, templateSelector, popupHandler) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupHandler = popupHandler;
    }
    
    _getTemplate() {
        const newElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return newElement;
    }

    _handleLikeButton(evt) {
        const clickedItem = evt.target;
        clickedItem.classList.toggle('element__like-button_pressed');
    }

    _removeElement(evt) {
        const clickedLike = evt.target;
        clickedLike.closest('.element').remove();
      }

    _setEventListeners(elementImage) {
        this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeButton);
        this._element.querySelector('.element__remove-button').addEventListener('click', this._removeElement);
        elementImage.addEventListener('click', () => this._popupHandler(this._name, this._link));
    }

    renderElement() {
        this._element = this._getTemplate();
        const newElementImage = this._element.querySelector('.element__image');
        newElementImage.src = this._link;
        newElementImage.alt = this._name;
        this._setEventListeners(newElementImage);
        this._element.querySelector('.element__text').textContent = this._name;
        return this._element;
    }
}