import { useState } from "react";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import IconCart from "../assets/images/icon-cart.svg";
import "./ProductDetail.css"

const product = {
  store_id: 1,
  product_id: 1,
  store_name: "Sneaker Company",
  product_name: "Fall Limited Edition Sneakers",
  product_description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  price: 250.00,
  discountedPrice: 125.00,
  discount: 50,
};

export default function ProductDetail() {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value > 0 ? value : 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      // Get existing cart items
      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

      // Create cart item with consistent structure
      const cartItem = {
        id: product.product_id,
        name: product.product_name,
        price: product.discountedPrice,
        quantity: quantity,
        store_name: product.store_name
      };

      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        existingCart.push(cartItem);
      }

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      alert(`Added ${quantity} item(s) to cart`);

      // Dispatch custom event to notify cart component
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  return (
    <div className="product-detail">
      <div className="product">
        <h2 className="store-name">{product.store_name}</h2>
        <h1 className="product-name">{product.product_name}</h1>
        <p className="product-description">{product.product_description}</p>
      </div>
      <div className="price">
        <h3 className="discounted-price">
          ${product.discountedPrice.toFixed(2)}
          <span className="discount">{product.discount}%</span>
        </h3>
        <h4 className="real-price">${product.price.toFixed(2)}</h4>
      </div>
      <div className="add-cart">
        <div className="cart-quantity">
          <button className="minus" onClick={handleDecrement}>
            <img src={IconMinus} alt="decrease quantity" />
          </button>
          <input
            type="number"
            min="1"
            className="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button className="plus" onClick={handleIncrement}>
            <img src={IconPlus} alt="increase quantity" />
          </button>
        </div>
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          <img src={IconCart} alt="cart" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}
