// import './styles/App.css'
import React from 'react';
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import ProductPicture from "./components/ProductPicture";

export default function App() {
  const [activePage, setActivePage] = React.useState('men');
  return (
    <>
      <Navbar activePage={activePage} />
      <main className="container">
        <ProductPicture />
        <ProductDetail />
      </main>
    </>
  );
}
