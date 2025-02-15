import "./ProductDetail.css"

import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";
import IconCart from "../assets/images/icon-cart.svg";

import { useState } from "react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="product-detail">
      <div className="product">
        <h2 className="store-name">Sneaker Company</h2>
        <h1 className="product-name">Fall Limited Edition Sneakers</h1>
        <p className="product-description">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything the
          weather can offer.
        </p>
      </div>
      <div className="price">
        <h3 className="discounted-price">
          $125.00<span className="discount">50%</span>
        </h3>
        <h4 className="real-price">$250.00</h4>
      </div>
      <div className="add-cart">
        <div className="cart-quantity">
          <button>
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
