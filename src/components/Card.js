export default class Card {
    constructor(data, templateSelector, myID, popupHandler, deleteHandler, likeHandler) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner._id;
        this._myID = myID;
        this._cardID = data._id;
        this._templateSelector = templateSelector;
        this._popupHandler = popupHandler;
        this._deleteHandler = deleteHandler;
        this._likeHandler = likeHandler;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners(cardImage) {
            this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
                this._likeHandler(this._cardID, evt);
            });
            cardImage.addEventListener('click', () => this._popupHandler(this._name, this._link));
        }
        //
    renderCard() {
        this._element = this._getTemplate();
        if (this._myID === this._owner) {
            this._element.querySelector('.element__remove-button').addEventListener('click', (evt) => {
                this._deleteHandler(this._cardID, evt);
            });
        } else {
            this._element.querySelector('.element__remove-button').remove();
        }
        const newCardImage = this._element.querySelector('.element__image');
        newCardImage.src = this._link;
        newCardImage.alt = this._name;
        this._setEventListeners(newCardImage);
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__like-counter').textContent = this._likes.length;

        if ((this._likes.some(elem => elem._id === this._myID))) {
            this._element.querySelector('.element__like-button').classList.add('element__like-button_pressed');
        }

        return this._element;
    }
}