import { useState } from "react";
import "./ProductPicture.css";
import { Data } from "../hooks/data";

export default function ProductPicture() {
  const { 
    data,           
    loading,        
    error,         
    isLoaded,       
    getImagesByProduct,
  } = Data();

  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle loading dan error state
  if (loading) return <div>Loading images...</div>;
  if (error) return <div>Error loading images: {error}</div>;

  const productId = 1;

  // PERBAIKAN 1: Gunakan nama variabel yang konsisten
  const productImages = getImagesByProduct(productId);

  // PERBAIKAN 2: Validasi data
  if (!productImages || productImages.length === 0) {
    return <div>No images found for this product</div>;
  }

  const handleToggle = () => {
    if (window.innerWidth > 768) {
      setIsActive(!isActive);
    }
  };

  // PERBAIKAN 3: Gunakan productImages (bukan productImages yang undefined)
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
              src={productImages[currentIndex]?.full}
              alt={productImages[currentIndex]?.alt_text || `Product ${currentIndex + 1}`}
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
          {productImages.map((image, index) => (
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
                <img 
                  src={image?.thumb} 
                  alt={image?.alt_text || `Thumbnail ${index + 1}`} 
                />
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
                src={productImages[currentIndex]?.full}
                alt={productImages[currentIndex]?.alt_text || `Product ${currentIndex + 1}`}
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
            {productImages.map((image, index) => (
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
                  <img 
                    src={image?.thumb} 
                    alt={image?.alt_text || `Thumbnail ${index + 1}`} 
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}