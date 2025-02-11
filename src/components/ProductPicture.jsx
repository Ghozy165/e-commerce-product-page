import productImage1 from "../assets/images/image-product-1.jpg";
import productImage2 from "../assets/images/image-product-2.jpg";
import productImage3 from "../assets/images/image-product-3.jpg";
import productImage4 from "../assets/images/image-product-4.jpg";

import productImageThumbnail1 from "../assets/images/image-product-1-thumbnail.jpg";
import productImageThumbnail2 from "../assets/images/image-product-2-thumbnail.jpg";
import productImageThumbnail3 from "../assets/images/image-product-3-thumbnail.jpg";
import productImageThumbnail4 from "../assets/images/image-product-4-thumbnail.jpg";

import "./ProductPicture.css";

export default function ProductPicture() {
  return (
    <div className="product-carousel">
      <div className="product-carousel-image">
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
      </div>
      <div className="product-carousel-control">
        <div className="product-image-thumbnail">
          <img src={productImageThumbnail1} alt="" />
        </div>
        <div className="product-image-thumbnail">
          <img src={productImageThumbnail2} alt="" />
        </div>
        <div className="product-image-thumbnail">
          <img src={productImageThumbnail3} alt="" />
        </div>
        <div className="product-image-thumbnail">
          <img src={productImageThumbnail4} alt="" />
        </div>
      </div>
    </div>
  );
}
