import React, { useState, useEffect } from 'react';
import cartIcon from "../assets/images/icon-cart.svg";
import closeIcon from "../assets/images/icon-close.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import productImage from "../assets/images/image-product-1-thumbnail.jpg";
import "./Cart.css"

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        loadCartItems();

        const handleCartUpdate = () => {
            loadCartItems();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const loadCartItems = () => {
        const savedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(savedItems);
    };

    const handleRemoveFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="cart-container">
            <button className="cart" onClick={toggleCart}>
                <img src={cartIcon} alt="Shopping cart" />
                {getTotalItems() > 0 && (
                    <span className="cart-sum">{getTotalItems()}</span>
                )}
            </button>

            {isCartOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Cart</h3>
                        <img className='close-cart' src={closeIcon} alt="Close cart button" onClick={toggleCart} />
                    </div>
                    <hr></hr>
                    <div className="cart-items">
                        {cartItems.length === 0 ? (
                            <p className="empty-cart">Your cart is empty</p>
                        ) : (
                            <>
                                <ul className="cart-list">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="cart-item">
                                            <div className="item-image">
                                                <img
                                                    src={productImage}
                                                    alt="item image"
                                                    className="item-image-detail" />
                                            </div>
                                            <div className="item-details">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-price">
                                                    ${item.price.toFixed(2)} x {item.quantity}
                                                    &nbsp;<strong>${getTotalPrice().toFixed(2)}</strong>
                                                </span>
                                            </div>
                                            <img
                                                src={deleteIcon}
                                                alt="Remove item"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                className="remove-btn"
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <div className="cart-footer">
                                    <button className="checkout-btn">
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}