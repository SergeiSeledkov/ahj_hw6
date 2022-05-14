import ChangeCardOnPage from './ChangeCardOnPage';

export default class LoadDom {
  constructor() {
    this.columnDescription = document.querySelectorAll('.table-col__description');
  }

  firstLoad() {
    if (localStorage.length >= 1) {
      for (let i = 0; i < localStorage.length; i += 1) {
        for (let k = 0; k < this.columnDescription.length; k += 1) {
          if (this.columnDescription[k].textContent === localStorage.key(i)) {
            let storageItemArray = localStorage.getItem(localStorage.key(i));

            storageItemArray = JSON.parse(storageItemArray);

            for (const l of storageItemArray) {
              const parentColumn = this.columnDescription[k].closest('.table-col');
              const changeCardOnPage = new ChangeCardOnPage(parentColumn, l);

              changeCardOnPage.addCardOnPage();
            }
          }
        }
      }
    }
  }
}
