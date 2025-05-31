import { useState } from "react";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import IconCart from "../assets/images/icon-cart.svg";
import "./ProductDetail.css"
import { Data } from "../hooks/data";

export default function ProductDetail() {
  const { 
    data,           
    loading,        
    error,         
    isLoaded,       
    getStoreById,
    getProductsByStore,
  } = Data();

  const [quantity, setQuantity] = useState(1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const storeId = 1;

  const store = getStoreById(storeId);
  const products = getProductsByStore(storeId);
  const product = products[0]; 

  if (!store) {
    return <div>Store not found</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found for this store</div>;
  }

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
      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

      const discountedPrice = product.discount_percent > 0 
        ? product.price * (1 - product.discount_percent / 100)
        : product.price;

      const cartItem = {
        id: product.id, 
        name: product.name,
        price: discountedPrice, 
        quantity: quantity,
        store_name: store.name 
      };

      const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      alert(`Added ${quantity} item(s) to cart`);

      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const discountedPrice = product.discount_percent > 0 
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;

  return (
    <div className="product-detail">
      <div className="product">
        <h2 className="store-name">{store.name}</h2>
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">{product.description}</p>
      </div>
      
      <div className="price">
        {product.discount_percent > 0 ? (
          <>
            <h3 className="discounted-price">
              ${discountedPrice.toFixed(2)}
              <span className="discount">{product.discount_percent}%</span>
            </h3>
            <h4 className="real-price">${product.price.toFixed(2)}</h4>
          </>
        ) : (
          <h3 className="discounted-price">
            ${product.price.toFixed(2)}
          </h3>
        )}
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