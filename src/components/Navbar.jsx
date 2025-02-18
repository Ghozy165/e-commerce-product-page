import logo from "../assets/images/logo.svg";
import cartIcon from "../assets/images/icon-cart.svg";
import avatar from "../assets/images/image-avatar.png";
import iconMenu from "../assets/images/icon-menu.svg";
import iconClose from "../assets/images/icon-close.svg";
import "./Navbar.css";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => setIsActive(!isActive);

  useEffect(() => {
    const navLink = document.querySelectorAll(".link");
    navLink.forEach(link => {
      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, [isActive]);

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
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >Collections</a>
            </li>
            <li>
              <a
                className="link"
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >Men</a>
            </li>
            <li>
              <a
                className="link"
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >Women</a>
            </li>
            <li>
              <a
                className="link"
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >About</a>
            </li>
            <li>
              <a
                className="link"
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="cart-account">
        <button className="cart">
          <img src={cartIcon} alt="" />
          <span className="cart-sum">3</span>
        </button>
        <button className="profile-button">
          <img src={avatar} alt="" />
        </button>
      </div>
    </header>
  );
}
