import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ product }) => {
  const handleImagePress = () => {

    console.log('Image clicked');
  };

  return (
    <TouchableOpacity style={styles.product} activeOpacity={0.8} onPress={handleImagePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.mainImage }} style={styles.image} />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>{product.brandName}</Text>
        <Text style={styles.price}>
          {product.price.amount} {product.price.currency}
        </Text>

        {product.stockStatus === 'IN STOCK' ? (
          <Text style={styles.stockInStock}>In Stock</Text>
        ) : (
          <Text style={styles.stockOutOfStock}>Out of Stock</Text>
        )}

        <Text style={styles.colour}>Colour: {product.colour}</Text>

        <Text style={styles.description} numberOfLines={3}>
          {product.description}
        </Text>

        <View style={styles.sizesContainer}>
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text style={styles.sizeTitle}>Sizes Available:</Text>
              <View style={styles.sizeList}>
                {product.sizes.map((size, index) => (
                  <Text key={index} style={styles.size}>{size}</Text>
                ))}
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    flexDirection: 'column',
    width: '48%', // Each product takes up approximately half of the container
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 15,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#28a745',
  },
  stockInStock: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
    marginVertical: 5,
  },
  stockOutOfStock: {
    fontSize: 14,
    color: '#dc3545',
    fontWeight: '600',
    marginVertical: 5,
  },
  colour: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginVertical: 5,
  },
  sizesContainer: {
    marginTop: 10,
  },
  sizeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  sizeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  size: {
    fontSize: 12,
    color: '#007bff',
    marginRight: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default ProductItem;
