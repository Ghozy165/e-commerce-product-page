import { useState } from "react";
import "./ProductPicture.css";

import nextIcon from "../assets/images/icon-next.svg";
import prevIcon from "../assets/images/icon-previous.svg";

const images = import.meta.glob("../assets/images/*.jpg", {
  eager: true,
  import: "default",
});

// Menyusun array gambar dengan akses yang lebih aman
const productImages = [
  {
    full: images["../assets/images/image-product-1.jpg"] || "",
    thumb: images["../assets/images/image-product-1-thumbnail.jpg"] || "",
  },
  {
    full: images["../assets/images/image-product-2.jpg"] || "",
    thumb: images["../assets/images/image-product-2-thumbnail.jpg"] || "",
  },
  {
    full: images["../assets/images/image-product-3.jpg"] || "",
    thumb: images["../assets/images/image-product-3-thumbnail.jpg"] || "",
  },
  {
    full: images["../assets/images/image-product-4.jpg"] || "",
    thumb: images["../assets/images/image-product-4-thumbnail.jpg"] || "",
  },
];

export default function ProductPicture() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggle = () => {
    if (window.innerWidth > 768) {
      setIsActive(!isActive);
    }
  };

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % productImages.length);

  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );

  const handleThumbnailClick = (index) => setCurrentIndex(index);

  return (
    <>
      {/* Overlay */}
      {isActive && (
        <div className="overlay overlay-active" onClick={handleToggle}></div>
      )}

      {/* Carousel utama */}
      <div className="product-carousel">
        <div className="product-carousel-image" onClick={handleToggle}>
          <picture className="product-carousel-item">
            <img
              src={productImages[currentIndex].full}
              alt={`Product ${currentIndex + 1}`}
            />
          </picture>

          {/* Tombol Navigasi */}
          <button className="prev-control" onClick={handlePrev}>
            <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 1 3 9l8 8"
                stroke="#1D2026"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button className="next-control" onClick={handleNext}>
            <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m2 1 8 8-8 8"
                stroke="#1D2026"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnail */}
        <div className="product-carousel-thumbnail">
          {productImages.map(({ thumb }, index) => (
            <div key={index} className="product-image-thumbnail">
              <input
                type="radio"
                className="radio-thumbnail"
                id={`thumbnail-${index}`}
                name="thumbnail"
                checked={currentIndex === index}
                onChange={() => handleThumbnailClick(index)}
              />
              <label htmlFor={`thumbnail-${index}`}>
                <div
                  className={`thumbnail-overlay ${
                    currentIndex === index ? "active" : ""
                  }`}
                ></div>
                <img src={thumb} alt={`Thumbnail ${index + 1}`} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {isActive && (
        <div className="product-carousel-modal lightbox lightbox-active">
          <div className="product-carousel-image">
            <picture className="product-carousel-item">
              <img
                src={productImages[currentIndex].full}
                alt={`Product ${currentIndex + 1}`}
              />
            </picture>

            {/* Tombol Navigasi */}
            <button className="prev-control" onClick={handlePrev}>
              <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 1 3 9l8 8"
                  stroke="#1D2026"
                  strokeWidth="3"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <button className="next-control" onClick={handleNext}>
              <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m2 1 8 8-8 8"
                  stroke="#1D2026"
                  strokeWidth="3"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnail di Modal */}
          <div className="product-carousel-thumbnail">
            {productImages.map(({ thumb }, index) => (
              <div key={index} className="product-image-thumbnail">
                <input
                  type="radio"
                  className="radio-thumbnail"
                  id={`modal-thumbnail-${index}`}
                  name="modal-thumbnail"
                  checked={currentIndex === index}
                  onChange={() => handleThumbnailClick(index)}
                />
                <label htmlFor={`modal-thumbnail-${index}`}>
                  <div
                    className={`thumbnail-overlay ${
                      currentIndex === index ? "active" : ""
                    }`}
                  ></div>
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
