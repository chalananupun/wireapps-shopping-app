import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchProducts } from '../services/ProductService';
import useProductStore from '../services/useProductStore';
import LottieView from 'lottie-react-native';
import { strings } from '../utils/strings';

function ProductListScreen({ navigation }) {
  const { products, loading, error, setProducts, setError, setLoading, stopLoading } = useProductStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const getProducts = async () => {
    setLoading();
    try {
      const productData = await fetchProducts();
      stopLoading();
      setProducts(productData);
    } catch (error) {
      setError(strings.errorLoadingProducts);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts, setError, setLoading]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const productData = await fetchProducts();
      setProducts(productData);
    } catch (error) {
      setError(strings.errorRefreshingProducts);
    } finally {
      setRefreshing(false);
    }
  }, [setProducts, setError]);

  const getRandomLottieAnimation = () => {
    const animations = [
      {
        source: require('../assets/sale.json'),
        size: { width: 150, height: 150 },
        position: { top: -40, left: -60 },
      },
      {
        source: require('../assets/discount.json'),
        size: { width: 50, height: 50 },
        position: { top: 0, left: 0 },
      },
      {
        source: require('../assets/new.json'),
        size: { width: 80, height: 60 },
        position: { top: 0, left: -15 },
      },
    ];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const renderItem = ({ item }) => {
    const { source, size, position } = getRandomLottieAnimation();

    const isOutOfStock = item.stockStatus === strings.outOfStockStatus;

    return (
      <View style={[styles.productItem, isOutOfStock && styles.outOfStockItem]}>
        <View style={styles.imageContainer}>
          <LottieView
            source={source}
            autoPlay
            loop
            style={[styles.lottieAnimation, size, position]}
          />
          <Image style={[styles.productImage, isOutOfStock && styles.outOfStockImage]} source={{ uri: item.mainImage }} />
          {isOutOfStock && <Text style={styles.outOfStockText}>{strings.outOfStock}</Text>}
        </View>

        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{`${item.price.amount} ${item.price.currency}`}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Text style={styles.buttonText}>{strings.viewDetails}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>{strings.loadingProducts}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  errorText: {
    fontSize: 16,
    color: '#721c24',
  },
  productItem: {
    flex: 1,
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    padding: 15,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  outOfStockItem: {
    backgroundColor: '#f8d7da',
  },
  imageContainer: {
    position: 'relative',
    width: 140,
    height: 140,
  },
  productImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  outOfStockImage: {
    opacity: 0.5,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 12,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewDetailsButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  outOfStockText: {
    position: 'absolute',
    bottom: 50,

    transform: [{ translateX: 25 }],
    padding: 6,
    backgroundColor: '#721c24',
    opacity :0.7,
    color: '#fff',
    borderRadius: 5,
    zIndex: 2,
  },
  lottieAnimation: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default ProductListScreen;
