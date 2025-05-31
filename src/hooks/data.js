import { useState, useEffect, useMemo } from 'react';

export function useJsonData() {

  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [storesRes, productsRes, imagesRes] = await Promise.all([
          fetch('/data/stores.json'),
          fetch('/data/products.json'),
          fetch('/data/productImages.json')
        ]);

        // Check jika ada response yang error
        if (!storesRes.ok || !productsRes.ok || !imagesRes.ok) {
          throw new Error('Failed to fetch one or more data files');
        }

        // Parse JSON dari semua response
        const [storesData, productsData, categoriesData, imagesData] = await Promise.all([
          storesRes.json(),
          productsRes.json(),
          imagesRes.json()
        ]);

        // Set data ke state
        setStores(storesData.stores || []);
        setProducts(productsData.products || []);
        setProductImages(imagesData.productImages || []);

        console.log('Data loaded successfully');

      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []); // Empty dependency array - hanya run sekali

  // Helper functions - menggunakan useMemo untuk performa
  const helpers = useMemo(() => ({
    // Get product by ID
    getProductById: (id) => products.find(product => product.id === id),
    
    // Get store by ID
    getStoreById: (id) => stores.find(store => store.id === id),
    
    // Get products by store
    getProductsByStore: (storeId) => products.filter(product => product.store_id === storeId),
    
    // Get images by product
    getImagesByProduct: (productId) => productImages.filter(image => image.product_id === productId),
    
    // Search products
    searchProducts: (query) => {
      if (!query) return products;
      const searchTerm = query.toLowerCase();
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    },
    
    // Get featured products
    getFeaturedProducts: () => products.filter(product => product.is_featured),
    
    // Get discounted products
    getDiscountedProducts: () => products.filter(product => product.discount_percent > 0),
    
    // Get products with full details (includes store, category, images)
    getProductWithDetails: (productId) => {
      const product = products.find(p => p.id === productId);
      if (!product) return null;
      
      return {
        ...product,
        store: stores.find(s => s.id === product.store_id),
        images: productImages.filter(img => img.product_id === productId),
      };
    }
  }), [stores, products, productImages]);

  // Return data dan helper functions
  return {
    // Raw data
    data: {
      stores,
      products,
      productImages
    },
    
    // Loading states
    loading,
    error,
    isLoaded: !loading && !error,
    
    // Helper functions
    ...helpers
  };
}