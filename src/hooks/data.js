import { useState, useEffect, useMemo } from 'react';

export function Data() {
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

        if (!storesRes.ok || !productsRes.ok || !imagesRes.ok) {
          throw new Error('Failed to fetch one or more data files');
        }

        // Fixed: hanya destructure 3 variabel sesuai dengan jumlah fetch
        const [storesData, productsData, imagesData] = await Promise.all([
          storesRes.json(),
          productsRes.json(),
          imagesRes.json()
        ]);

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
  }, []);

  const helpers = useMemo(() => ({
    // Get product by ID
    getProductById: (id) => products.find(product => product.id === id),
    
    // Get store by ID
    getStoreById: (id) => stores.find(store => store.id === id),
    
    // Get products by store
    getProductsByStore: (storeId) => products.filter(product => product.store_id === storeId),
    
    // Get images by product
    getImagesByProduct: (productId) => productImages.filter(image => image.product_id === productId),
    
    // Get discounted products
    getDiscountedProducts: () => products.filter(product => product.discount_percent > 0),
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