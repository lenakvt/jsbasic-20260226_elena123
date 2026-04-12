import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    if (!cartItem) {
      return;
    }

    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    
    modal.setTitle('Your order');
    
    let modalBody = createElement(`<div></div>`);
    
    for (let cartItem of this.cartItems) {
      let productElement = this.renderProduct(cartItem.product, cartItem.count);
      modalBody.append(productElement);
    }
    
    let orderForm = this.renderOrderForm();
    modalBody.append(orderForm);
    
    modal.setBody(modalBody);
    modal.open();
    
    this.currentModal = modal;
    this.currentModalBody = modalBody;
    
    modalBody.addEventListener('click', (event) => {
      let minusButton = event.target.closest('.cart-counter__button_minus');
      let plusButton = event.target.closest('.cart-counter__button_plus');
      
      if (minusButton || plusButton) {
        let productElement = event.target.closest('[data-product-id]');
        let productId = productElement.dataset.productId;
        let amount = minusButton ? -1 : 1;
        
        this.updateProductCount(productId, amount);
      }
    });
    
    let cartForm = modalBody.querySelector('.cart-form');
    if (cartForm) {
      cartForm.addEventListener('submit', (event) => {
        this.onSubmit(event);
      });
    }
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    
    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }
    
    if (this.isEmpty()) {
      if (this.currentModal) {
        this.currentModal.close();
      }
      return;
    }
    
    let modalBody = this.currentModalBody;
    if (!modalBody) {
      return;
    }
    
    let productId = cartItem.product.id;
    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    
    if (productCount) {
      productCount.innerHTML = cartItem.count;
    }
    
    if (productPrice) {
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    }
    
    if (infoPrice) {
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    let submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    let formData = new FormData(event.target);

    try {
      let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();

      this.currentModal.setTitle('Success!');

      this.cartItems = [];

      this.currentModalBody.innerHTML = `
        <p>
          Order successful! Your order is being cooked :) <br>
          We'll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      `;
    } catch (error) {
      console.error('Error:', error);
      submitButton.classList.remove('is-loading');
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

