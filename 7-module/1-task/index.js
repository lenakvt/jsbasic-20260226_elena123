import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.init();
  }

  render() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories.map(category => `
            <a href="#" class="ribbon__item${category.id === '' ? ' ribbon__item_active' : ''}" data-id="${category.id}">
              ${category.name}
            </a>
          `).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    return ribbon;
  }

  init() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    // Кнопки прокрутки
    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    // Обновление видимости стрелок при прокрутке
    ribbonInner.addEventListener('scroll', () => {
      this.updateArrowVisibility(ribbonInner, arrowLeft, arrowRight);
    });

    // Выбор категории
    this.elem.querySelectorAll('.ribbon__item').forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault();

        // Удаляем активный класс с предыдущего элемента
        this.elem.querySelectorAll('.ribbon__item').forEach(el => {
          el.classList.remove('ribbon__item_active');
        });

        // Добавляем активный класс к нажатому элементу
        item.classList.add('ribbon__item_active');

        // Генерируем пользовательское событие
        const categoryId = item.dataset.id;
        const customEvent = new CustomEvent('ribbon-select', {
          detail: categoryId,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent);
      });
    });

    // Начальное обновление видимости стрелок
    this.updateArrowVisibility(ribbonInner, arrowLeft, arrowRight);
  }

  updateArrowVisibility(ribbonInner, arrowLeft, arrowRight) {
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    // Скрываем левую стрелку, если в начале
    if (scrollLeft === 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.add('ribbon__arrow_visible');
    }

    // Скрываем правую стрелку, если в конце (считаем < 1 за 0)
    if (scrollRight < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}