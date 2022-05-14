import RemoveCard from './RemoveCard';

export default class ChangeCardOnPage {
  constructor(column, inputFiledValue) {
    this.column = column;
    this.inputFiledValue = inputFiledValue;
    this.addContainer = document.createElement('div');
    this.addText = document.createElement('span');
  }

  addCardOnPage() {
    const allCardInColumn = this.column.querySelectorAll('.table-card');
    const removeCard = new RemoveCard(this.addContainer);

    this.addContainer.classList.add('table-card');
    this.addText.classList.add('table-card__title');
    this.addText.textContent = this.inputFiledValue;
    this.addContainer.prepend(this.addText);

    if (allCardInColumn.length > 0) {
      const lastCardColumn = allCardInColumn[allCardInColumn.length - 1];

      lastCardColumn.after(this.addContainer);
      removeCard.addRemoveEvent();
    } else {
      const titleColumn = this.column.querySelector('.table-col__description');

      titleColumn.after(this.addContainer);
      removeCard.addRemoveEvent();
    }
  }
}
