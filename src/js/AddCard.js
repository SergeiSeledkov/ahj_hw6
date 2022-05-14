import ChangeCardOnPage from './ChangeCardOnPage';

export default class AddCard {
  constructor(element) {
    this.element = element;
    this.parentElement = this.element.closest('.table-add');
    this.inputField = document.createElement('textarea');
    this.addButton = document.createElement('button');
    this.closeButton = document.createElement('button');
    this.containerButton = document.createElement('div');
  }

  openAddWindow() {
    this.inputField.classList.add('table-add__text');
    this.inputField.placeholder = 'Enter a title for this card...';
    this.addButton.classList.add('table-add__send');
    this.addButton.innerText = 'Add Card';
    this.closeButton.classList.add('table-add__close');
    this.containerButton.classList.add('table-add__container__button');

    this.element.classList.add('hidden');
    this.parentElement.prepend(this.containerButton);
    this.containerButton.prepend(this.closeButton);
    this.containerButton.prepend(this.addButton);
    this.parentElement.prepend(this.inputField);
    this.inputField.focus();

    this.addButton.addEventListener('click', () => {
      this.saveCard();
    });

    this.closeButton.addEventListener('click', () => {
      this.removeAddWindow();
    });
  }

  removeAddWindow() {
    this.inputField.remove();
    this.containerButton.remove();
    this.element.classList.remove('hidden');
  }

  saveCard() {
    const column = this.element.closest('.table-col');
    const titleColumn = column.firstChild.textContent;
    let inputFiledValue = this.inputField.value;
    const changeCardOnPage = new ChangeCardOnPage(column, inputFiledValue);

    if (localStorage.getItem(titleColumn) !== null) {
      let storageItemArray = JSON.parse(localStorage.getItem(titleColumn));

      storageItemArray.push(inputFiledValue);
      storageItemArray = JSON.stringify(storageItemArray);
      localStorage.setItem(titleColumn, storageItemArray);
      this.removeAddWindow();
      changeCardOnPage.addCardOnPage();
    } else {
      inputFiledValue = JSON.stringify([inputFiledValue]);
      localStorage.setItem(titleColumn, inputFiledValue);
      this.removeAddWindow();
      changeCardOnPage.addCardOnPage();
    }
  }

  saveCardAfterMove(columnDragged, columnGhost) {
    const titleColumnDragged = columnDragged.firstChild.textContent;
    const titleColumnGhost = columnGhost.firstChild.textContent;
    const tableCardInColumnDragged = columnDragged.querySelectorAll('.table-card');
    const tableCardInColumnGhost = columnGhost.querySelectorAll('.table-card');
    let arrayForStorage = [];

    for (let i = 0; i < tableCardInColumnDragged.length; i += 1) {
      arrayForStorage.push(tableCardInColumnDragged[i].querySelector('.table-card__title').textContent);
    }

    arrayForStorage = JSON.stringify(arrayForStorage);
    localStorage.setItem(titleColumnDragged, arrayForStorage);
    arrayForStorage = [];

    for (let i = 0; i < tableCardInColumnGhost.length; i += 1) {
      arrayForStorage.push(tableCardInColumnGhost[i].querySelector('.table-card__title').textContent);
    }

    arrayForStorage = JSON.stringify(arrayForStorage);
    localStorage.setItem(titleColumnGhost, arrayForStorage);
  }
}
