import productImage from "./assets/images/image-product-1.jpg";
// import './styles/App.css'
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <picture className="product-image">
          <img src={productImage} alt="" />
        </picture>
        <div className="product-detail">
          <h2 className="store-name">Sneaker Company</h2>
          <h1 className="product-name">Fall Limited Edition Sneakers</h1>
          <p className="product-description">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="price">
            <div >
              <h3 className="discounted-price">$125.00<span className="discount">50%</span></h3>
              <h4 className="real-price">$250.00</h4>
            </div>
          </div>
          <div className="cart">
            <div className="cart-quantity">
              <button className="minus">-</button>
              <span>0</span>
              <button className="plus">+</button>
            </div>
            <button className="add-to-cart">Add to cart</button>
          </div>
        </div>
      </main>
    </>
  );
}
