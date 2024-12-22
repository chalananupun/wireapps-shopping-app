import {create} from 'zustand';

// const useProductStore = create((set) => ({
//   products: [],
//   loading: true,
//   error: null,
//   setProducts: (productData) => set({ products: productData, loading: false }),
//   setError: (errorMessage) => set({ error: errorMessage, loading: false }),
//   setLoading: () => set({ loading: true }),
// }));

// export default useProductStore;

const useProductStore = create((set) => ({
    products: [], 
    cart: [],
    loading: false,
    error: null,
  
    setProducts: (products) => set({ products }),
    setLoading: () => set({ loading: true }),
    setError: (error) => set({ error }),
    stopLoading: () => set({ loading: false }),
    addToCart: (newCart) => set({ cart: newCart }),
    clearCart: () => set({ cart: [] }),
  }));
  
  export default useProductStore;
