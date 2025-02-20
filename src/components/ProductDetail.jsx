import "./ProductDetail.css"

import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import IconCart from "../assets/images/icon-cart.svg";

import { useState } from "react";

const product = {
  store_id: 1,
  product_id: 1,
  store_name: "Sneaker Company",
  product_name: "Fall Limited Edition Sneakers",
  product_description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 250.00,
  discountedPrice: 125.00,
  discount: 50,
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="product-detail">
      <div className="product">
        <h2 className="store-name">{product.store_name}</h2>
        <h1 className="product-name">{product.product_name}</h1>
        <p className="product-description">{product.product_description}</p>
      </div>
      <div className="price">
        <h3 className="discounted-price">
          ${product.discountedPrice}<span className="discount">{product.discount}%</span>
        </h3>
        <h4 className="real-price">${product.price}</h4>
      </div>
      <div className="add-cart">
        <div className="cart-quantity">
          <button className="minus">
            <img src={IconMinus} alt="minus" />
          </button>
          <input
            type="number"
            min="1"
            className="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className="plus">
            <img src={IconPlus} alt="plus" />
          </button>
        </div>
        <button className="btn-add-to-cart">
          <img src={IconCart} alt="cart" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}
