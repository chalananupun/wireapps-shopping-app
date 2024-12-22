import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { strings } from '../utils/strings';

function ProductDetailScreen({ route, navigation }) {
  const { product, addToCart } = route.params;

  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const isOutOfStock = product.stockStatus === strings.outOfStockStatus;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      Alert.alert(strings.outOfStockTitle, strings.outOfStockMessage);
      return;
    }

    if (!selectedSize) {
      Alert.alert(strings.sizeSelectErrorTitle, strings.sizeSelectErrorMessage);
    } else {
      setLoading(true);
      addToCart({ ...product, selectedSize });
      setTimeout(() => {
        setLoading(false);
        navigation.goBack();
      }, 2300);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image style={styles.productImage} source={{ uri: product.mainImage }} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{`${product.price.amount} ${product.price.currency}`}</Text>

        {product.sizes && product.sizes.length > 0 ? (
          <View style={styles.sizePickerContainer}>
            <Text style={styles.sizeLabel}>{strings.selectSizeLabel}</Text>
            <View style={styles.sizeButtonsContainer}>
              {product.sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={styles.sizeButtonText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.noSizeText}>{strings.noSizesAvailable}</Text>
        )}

        <TouchableOpacity
          onPress={handleAddToCart}
          style={[styles.addToCartButton, isOutOfStock && styles.outOfStockButton]}
          disabled={isOutOfStock}
        >
          {loading ? (
            <LottieView
              source={require('../assets/added.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          ) : (
            <Text style={styles.addToCartText}>
              {isOutOfStock ? strings.outOfStockButtonText : strings.addToCartText}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingBottom: 30, // Ensures the last element has space on the bottom
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
  },
  sizePickerContainer: {
    marginBottom: 30,
  },
  sizeLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  sizeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  sizeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedSizeButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  noSizeText: {
    fontSize: 16,
    color: 'gray',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockButton: {
    backgroundColor: '#d3d3d3',
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
  },
  lottie: {
    width: 50,
    height: 50,
  },
});

export default ProductDetailScreen;
