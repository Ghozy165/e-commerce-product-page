// import './styles/App.css'
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import ProductPicture from "./components/ProductPicture";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <ProductPicture />
        <ProductDetail />
      </main>
    </>
  );
}
