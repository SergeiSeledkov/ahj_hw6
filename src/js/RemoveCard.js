export default class RemoveCard {
  constructor(container) {
    this.container = container;
    this.crossImage = document.createElement('div');
  }

  addRemoveEvent() {
    this.crossImage.classList.add('table-card__title__after');

    this.container.addEventListener('mouseenter', (e) => {
      e.target.append(this.crossImage);
    });

    this.container.addEventListener('mouseout', (e) => {
      if (e.relatedTarget !== null && !e.relatedTarget.classList.contains('table-card__title__after')) {
        this.crossImage.remove();
      }
      if (e.relatedTarget === null) {
        this.crossImage.remove();
      }
    });

    this.crossImage.addEventListener('click', (e) => {
      this.deleteCard(e.target);
    });
  }

  deleteCard(element) {
    const deleteElement = element.closest('.table-card');
    const textDeleteElement = deleteElement.querySelector('.table-card__title').textContent;
    const columnTitle = deleteElement.closest('.table-col').firstChild.textContent;

    deleteElement.remove();
    this.deleteLocalStorage(columnTitle, textDeleteElement);
  }

  deleteLocalStorage(title, textElement) {
    let storageArray = JSON.parse(localStorage.getItem(title));

    for (const i in storageArray) {
      if (storageArray[i] === textElement) {
        storageArray.splice(i, 1);
      }
    }

    storageArray = JSON.stringify(storageArray);
    localStorage.setItem(title, storageArray);
  }
}
