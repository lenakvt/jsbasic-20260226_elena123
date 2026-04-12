import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    // Создаём структуру сетки товаров
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.inner = this.elem.querySelector('.products-grid__inner');

    // Отрисовываем все товары
    this.render();
  }

  render() {
    // Очищаем существующие карточки
    this.inner.innerHTML = '';

    // Получаем отфильтрованные товары
    let filteredProducts = this.getFilteredProducts();

    // Создаём и добавляем карточку для каждого товара
    filteredProducts.forEach(product => {
      let card = new ProductCard(product);
      this.inner.appendChild(card.elem);
    });
  }

  updateFilter(newFilters) {
    // Пропускаем текущие фильтры с новыми
    this.filters = Object.assign(this.filters, newFilters);

    // Перерисовываем с новыми фильтрами
    this.render();
  }

  getFilteredProducts() {
    return this.products.filter(product => {
      // Фильтр noNuts: исключаем товары с орехами
      if (this.filters.noNuts === true && product.nuts === true) {
        return false;
      }

      // Фильтр vegeterianOnly: показываем только вегетарианские товары
      if (this.filters.vegeterianOnly === true && product.vegeterian !== true) {
        return false;
      }

      // Фильтр maxSpiciness: показываем товары с остротой <= maxSpiciness
      if (this.filters.maxSpiciness !== undefined) {
        let spiciness = product.spiciness || 0;
        if (spiciness > this.filters.maxSpiciness) {
          return false;
        }
      }

      // Фильтр category: показываем только товары из указанной категории
      if (this.filters.category && this.filters.category !== '') {
        if (product.category !== this.filters.category) {
          return false;
        }
      }

      return true;
    });
  }
}