import React, { useState } from 'react';

import cartIcon from "../assets/images/icon-cart.svg";

import "./Cart.css"

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    return (
        <div>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
            <button className="cart">
                <img src={cartIcon} alt="" />
                <span className="cart-sum">3</span>
            </button>
        </div>
    );
};