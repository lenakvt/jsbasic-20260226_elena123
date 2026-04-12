export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // Guard against null or undefined product
    if (!product) {
      return;
    }

    // Check if product already exists in cart
    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      // Product exists, increase count
      cartItem.count += 1;
    } else {
      // Product doesn't exist, add it with count 1
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // Find the product in cart
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    if (!cartItem) {
      return;
    }

    // Update the count
    cartItem.count += amount;

    // If count becomes 0 or less, remove from cart
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

