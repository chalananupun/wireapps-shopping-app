import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useCartStore } from '../services/cartStore';
import { strings } from '../utils/strings';

function CartScreen() {
  const { cart, removeItem } = useCartStore();

  const totals = cart.reduce(
    (acc, item) => {
      acc.qty += item.quantity || 1; 
      acc.price += (item.price.amount || 0) * (item.quantity || 1);
      return acc;
    },
    { qty: 0, price: 0 }
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.mainImage }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text>{`${item.price.amount} ${item.price.currency}`}</Text>
        <Text>{`${strings.totalQuantity} ${item.quantity || 1}`}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require('../assets/empty-cart.json')} 
            autoPlay
            loop 
            style={styles.lottie}
          />
          <Text style={styles.emptyCart}>{strings.emptyCart}</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{strings.totalQuantity}</Text>
              <Text style={styles.totalValue}>{totals.qty}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{strings.totalPrice}</Text>
              <Text style={styles.totalValue}>
                {totals.price.toFixed(2)} {cart[0]?.price.currency || strings.currency}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart: {
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  totalsContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', 
  },
});

export default CartScreen;
