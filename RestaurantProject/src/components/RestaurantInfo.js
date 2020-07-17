import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RestaurantInfo = ({ restaurants, index }) => {
  const [formatPriceLevel, setFormatPriceLevel] = useState('');

  // TODO: how do we want to represent a price level of 0?
  const formatPrice = useCallback(() => {
    const priceLevel = restaurants[index].price_level;
    if (priceLevel === 0) {
      setFormatPriceLevel('0');
    } else if (priceLevel === 1) {
      setFormatPriceLevel('$');
    } else if (priceLevel === 2) {
      setFormatPriceLevel('$$');
    } else if (priceLevel === 3) {
      setFormatPriceLevel('$$$');
    } else if (priceLevel === 4) {
      setFormatPriceLevel('$$$$');
    } else {
      setFormatPriceLevel('0');
    }
  }, [restaurants, index]);

  useEffect(() => {
    formatPrice();
  }, [formatPrice, restaurants]);

  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{restaurants[index].name}</Text>
      <Text>
        Address: {'\n'}
        {restaurants[index].formatted_address}
      </Text>
      <Text>Price Level: {formatPriceLevel}</Text>
      <Text>Rating: {restaurants[index].rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RestaurantInfo;
