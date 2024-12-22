export const fetchProducts = async () => {
    try {
      const response = await fetch('https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  