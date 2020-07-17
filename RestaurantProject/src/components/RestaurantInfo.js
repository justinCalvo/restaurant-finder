import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RestaurantInfo = ({ restaurants, index }) => {
  const [formatPriceLevel, setFormatPriceLevel] = useState('');
  const [stars, setStars] = useState([]);

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

  const createStars = useCallback(() => {
    const afterDecimal = restaurants[index].rating.toString().slice(2);
    const wholeNumber = Math.floor(restaurants[index].rating);
    let starArray = [];

    for (var i = 1; i <= 5; i++) {
      if (i <= wholeNumber) {
        starArray.push('star');
      } else if (afterDecimal >= 8) {
        starArray.push('star');
      } else if (afterDecimal <= 7 && afterDecimal >= 3) {
        starArray.push('star-half');
      } else {
        starArray.push('star-border');
      }
    }
    setStars(starArray);
  }, [restaurants, index]);

  useEffect(() => {
    formatPrice();
    createStars();
  }, [formatPrice, createStars, restaurants]);
  console.log(stars);
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{restaurants[index].name}</Text>
      <Text>
        Address: {'\n'}
        {restaurants[index].formatted_address}
      </Text>
      <Text>Price: {formatPriceLevel}</Text>
      <View style={styles.ratingContainer}>
        <Icon name={stars[0]} size={25} color="gold" />
        <Icon name={stars[1]} size={25} color="gold" />
        <Icon name={stars[2]} size={25} color="gold" />
        <Icon name={stars[3]} size={25} color="gold" />
        <Icon name={stars[4]} size={25} color="gold" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  textName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'black',
  },
  icon: {},
});

export default RestaurantInfo;
