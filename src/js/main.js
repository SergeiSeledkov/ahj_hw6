import AddCard from './AddCard';
import LoadDom from './LoadDom';
import RemoveCard from './RemoveCard';

const addButton = document.querySelectorAll('.table-add__button');
const loadDom = new LoadDom();

loadDom.firstLoad();

for (const i of addButton) {
  i.addEventListener('click', () => {
    const addCard = new AddCard(i);

    addCard.openAddWindow();
  });
}

function addMoveEvent() {
  const preview = document.createElement('div');
  let draggedEl = null;
  let ghostEl = null;
  let startX = 0;
  let elementTop = 0;
  let savedItem = null;

  preview.classList.add('preview');

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (!e.target.classList.contains('table-card')) {
      return;
    }

    draggedEl = e.target;
    const { top } = e.target.getBoundingClientRect();
    elementTop = e.pageY - top;
    ghostEl = e.target.cloneNode(true);
    ghostEl.style.width = `${e.target.clientWidth}px`;
    ghostEl.style.height = `${e.target.clientHeight}px`;
    preview.style.width = `${e.target.clientWidth}px`;
    preview.style.height = `${e.target.clientHeight}px`;
    ghostEl.classList.add('dragged');
    draggedEl.classList.add('draggerEl');
    draggedEl.style.width = `${e.target.clientWidth}px`;
    draggedEl.style.height = `${e.target.clientHeight}px`;
    savedItem = draggedEl.querySelector('.table-card__title');
    savedItem.remove();
    ghostEl.querySelector('.table-card__title__after').remove();
    startX = e.clientX;
    ghostEl.style.left = `${e.target.offsetLeft}px`;
    ghostEl.style.top = `${e.target.offsetTop}px`;
    document.body.appendChild(ghostEl);
    document.body.classList.add('cursor');
  });

  document.addEventListener('mousemove', (e) => {
    e.preventDefault();

    if (!ghostEl) {
      return;
    }

    const rect = draggedEl.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const changingItem = document.elementFromPoint(x, y);

    ghostEl.style.left = `${rect.left + e.clientX - startX}px`;
    ghostEl.style.top = `${e.pageY - elementTop}px`;

    if (changingItem.classList.contains('table-card') && changingItem !== draggedEl) {
      const rectChangingItem = changingItem.getBoundingClientRect();
      const centerChangingItem = rectChangingItem.top + rectChangingItem.height / 2;

      if (y > centerChangingItem) {
        changingItem.after(preview);
      } else {
        changingItem.before(preview);
      }
    }

    if (changingItem.classList.contains('table-col') || changingItem.classList.contains('table-col__description')) {
      if (changingItem.querySelector('.table-col__description') !== null) {
        changingItem.querySelector('.table-col__description').after(preview);
      }
    }
  });

  document.addEventListener('mouseup', (e) => {
    e.preventDefault();

    if (!ghostEl) {
      return;
    }

    const addCard = new AddCard(ghostEl);
    const removeCard = new RemoveCard(ghostEl);
    const columnDragged = draggedEl.closest('.table-col');
    const columnGhost = preview.closest('.table-col');

    if (columnGhost !== null) {
      draggedEl.remove();
      preview.after(ghostEl);
      ghostEl.style.top = '';
      ghostEl.style.left = '';
      ghostEl.style.width = '';
      ghostEl.style.height = '';
      ghostEl.classList.remove('dragged');
      preview.remove();
      removeCard.addRemoveEvent();
      addCard.saveCardAfterMove(columnDragged, columnGhost);
    } else {
      draggedEl.classList.remove('draggerEl');
      draggedEl.prepend(savedItem);
      ghostEl.remove();
    }

    ghostEl = null;
    draggedEl = null;
    document.body.classList.remove('cursor');
  });
}

addMoveEvent();
