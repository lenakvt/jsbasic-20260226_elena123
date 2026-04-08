import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = null;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    const modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
    `);
    return modal;
  }

  open() {
    if (!this.elem) {
      this.elem = this.render();
    }

    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    // Кнопка закрытия
    const closeButton = this.elem.querySelector('.modal__close');
    closeButton.addEventListener('click', () => this.close());

    // Слушаем событие keydown для закрытия по ESC
    document.addEventListener('keydown', this.onKeyDown);
  }

  close() {
    if (this.elem) {
      this.elem.remove();
      this.elem = null;
    }

    document.body.classList.remove('is-modal-open');

    // Удаляем обработчик события keydown
    document.removeEventListener('keydown', this.onKeyDown);
  }

  setTitle(title) {
    if (!this.elem) {
      this.elem = this.render();
    }

    const titleElement = this.elem.querySelector('.modal__title');
    titleElement.textContent = title;
  }

  setBody(node) {
    if (!this.elem) {
      this.elem = this.render();
    }

    const bodyElement = this.elem.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.append(node);
  }

  onKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}