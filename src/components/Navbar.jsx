import logo from "../assets/images/logo.svg";
import cartIcon from "../assets/images/icon-cart.svg";
import avatar from "../assets/images/image-avatar.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header>
      <nav>
        <img src={logo} alt="web logo" />
        <ul>
          <li>
            <a href="#">Collections</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
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
