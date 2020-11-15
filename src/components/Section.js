export default class Section {
    constructor({ items, renderer }, sectionSelector) {
            this._renderedItems = items;
            this._renderer = renderer;
            this._container = document.querySelector(sectionSelector);
        }
     
    renderItems() {
            this._renderedItems.forEach(item => {
                this._renderer(item);
            });
        }
      
    insertItem(element) {
        this._container.append(element);
    }
    insertItemToTheTop(element) {
        this._container.prepend(element);
    }

}