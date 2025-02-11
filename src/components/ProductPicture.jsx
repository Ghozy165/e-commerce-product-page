import productImage1 from "../assets/images/image-product-1.jpg";
import productImage2 from "../assets/images/image-product-2.jpg";
import productImage3 from "../assets/images/image-product-3.jpg";
import productImage4 from "../assets/images/image-product-4.jpg";

import productImageThumbnail1 from "../assets/images/image-product-1-thumbnail.jpg";
import productImageThumbnail2 from "../assets/images/image-product-2-thumbnail.jpg";
import productImageThumbnail3 from "../assets/images/image-product-3-thumbnail.jpg";
import productImageThumbnail4 from "../assets/images/image-product-4-thumbnail.jpg";

import "./ProductPicture.css";

import nextIcon from "../assets/images/icon-next.svg";
import prevIcon from "../assets/images/icon-previous.svg";

import { useState } from "react";

export default function ProductPicture() {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => setIsActive(!isActive);

  return (
    <>
      <div
        className={`overlay ${isActive ? "overlay-active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      ></div>
      <div className="product-carousel">
        <div className="product-carousel-image" onClick={handleToggle}>
          <picture className="product-carousel-item isActive">
            <img src={productImage1} alt="" />
          </picture>
          <picture className="product-carousel-item">
            <img src={productImage2} alt="" />
          </picture>
          <picture className="product-carousel-item">
            <img src={productImage3} alt="" />
          </picture>
          <picture className="product-carousel-item">
            <img src={productImage4} alt="" />
          </picture>
          <button className="prev-control">
            <img src={prevIcon} alt="" />
          </button>
          <button className="next-control">
            <img src={nextIcon} alt="" />
          </button>
        </div>
        <div className="product-carousel-thumbnail">
          <div className="product-image-thumbnail">
            <input
              type="radio"
              className="radio-thumbnail"
              id="thumbnail-1"
              name="thumbnail"
              value="1"
            />
            <label htmlFor="thumbnail-1">
              <div className="thumbnail-overlay"></div>
              <img src={productImageThumbnail1} alt="" />
            </label>
          </div>
          <div className="product-image-thumbnail">
            <input
              type="radio"
              className="radio-thumbnail"
              id="thumbnail-2"
              name="thumbnail"
              value="2"
            />
            <label htmlFor="thumbnail-2">
              <div className="thumbnail-overlay"></div>
              <img src={productImageThumbnail2} alt="" />
            </label>
          </div>
          <div className="product-image-thumbnail">
            <input
              type="radio"
              className="radio-thumbnail"
              id="thumbnail-3"
              name="thumbnail"
              value="3"
            />
            <label htmlFor="thumbnail-3">
              <div className="thumbnail-overlay"></div>
              <img src={productImageThumbnail3} alt="" />
            </label>
          </div>
          <div className="product-image-thumbnail">
            <input
              type="radio"
              className="radio-thumbnail"
              id="thumbnail-4"
              name="thumbnail"
              value="4"
            />
            <label htmlFor="thumbnail-4">
              <div className="thumbnail-overlay"></div>
              <img src={productImageThumbnail4} alt="" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
