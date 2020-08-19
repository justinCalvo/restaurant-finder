import React from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const PriceRating = ({ index, priceLevel, size }) => {
  const restaurants = useSelector(state => state.restaurants);
  const checkPriceLevel =
    index !== undefined
      ? restaurants.restaurants[index].price_level
      : priceLevel;

  return (
    <>
      <FontAwesome
        name="dollar"
        size={size}
        color="black"
        style={
          checkPriceLevel >= 1 ? styles.showDollarOne : styles.hideDollarOne
        }
      />
      <FontAwesome
        name="dollar"
        size={size}
        color="black"
        style={
          checkPriceLevel >= 2 ? styles.showDollarTwo : styles.hideDollarTwo
        }
      />
      <FontAwesome
        name="dollar"
        size={size}
        color="black"
        style={
          checkPriceLevel >= 3 ? styles.showDollarThree : styles.hideDollarThree
        }
      />
      <FontAwesome
        name="dollar"
        size={size}
        color="black"
        style={
          checkPriceLevel >= 4 ? styles.showDollarFour : styles.hideDollarFour
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  showDollarOne: {
    display: 'flex',
  },
  hideDollarOne: {
    display: 'none',
  },
  showDollarTwo: {
    display: 'flex',
  },
  hideDollarTwo: {
    display: 'none',
  },
  showDollarThree: {
    display: 'flex',
  },
  hideDollarThree: {
    display: 'none',
  },
  showDollarFour: {
    display: 'flex',
  },
  hideDollarFour: {
    display: 'none',
  },
});

export default PriceRating;
