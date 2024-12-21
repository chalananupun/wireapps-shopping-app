// components/ProductList.js

import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';  // Make sure ProductItem is imported

const ProductList = ({ products }) => {
  // Assuming products is passed as a prop
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // This will make the FlatList display in two columns
        columnWrapperStyle={styles.row} // Style to separate the columns
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',  // Space between items in each row
    marginBottom: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

export default ProductList;
