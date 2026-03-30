import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;

    // DOM-элемент с карточкой товара (скопировала)
    this._elem = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    // Найти кнопку и добавить обработчик события
    const button = this._elem.querySelector('.card__button');
    button.addEventListener('click', () => {
      const event = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true
      });
      this._elem.dispatchEvent(event);
    });
  }

  get elem() {
    return this._elem;
  }
}