import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/image-avatar.png";
import iconMenu from "../assets/images/icon-menu.svg";
import iconClose from "../assets/images/icon-close.svg";
import "./Navbar.css";

import React from 'react';
import { useState } from "react";
import Cart from "./Cart";

export default function Navbar({
  activePage 
}) {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => setIsActive(!isActive);

  return (
    <header>
      <nav>
        <button className="hamburger-menu">
          <img
            src={iconMenu}
            alt="Open Navigation"
            aria-label="Toggle menu"
            onClick={handleToggle}
            aria-expanded={isActive}
          />
        </button>
        <img src={logo} alt="web logo" />
        <div className={`overlay ${isActive ? "overlay-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        ></div>
        <div className={`nav-links ${isActive ? "isActive" : ""}`}>
          <button className="hamburger-menu">
            <img
              src={iconClose}
              alt="Close Navigation"
              aria-label="Toggle menu"
              onClick={handleToggle}
              aria-expanded={isActive}
            />
          </button>
          <ul>
            <li>
              <a
                className="link"
                href="#collections"
                aria-current={activePage === 'collections' ? 'page' : ''}
              >Collections</a>
            </li>
            <li>
              <a
                className="link"
                href="#men"
                aria-current={activePage === 'men' ? 'page' : ''}
              >Men</a>
            </li>
            <li>
              <a
                className="link"
                href="#women"
                aria-current={activePage === 'women' ? 'page' : ''}
              >Women</a>
            </li>
            <li>
              <a
                className="link"
                href="#about"
                aria-current={activePage === 'about' ? 'page' : ''}
              >About</a>
            </li>
            <li>
              <a
                className="link"
                href="#contact"
                aria-current={activePage === 'contact' ? 'page' : ''}
              >Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="cart-account">
        <Cart />
        <button className="profile-button">
          <img src={avatar} alt="" />
        </button>
      </div>
    </header>
  );
}
