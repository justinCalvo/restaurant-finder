import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PriceRating = ({ index, priceLevel, size }) => {
  const details = useSelector(state => state.details);
  const checkPriceLevel =
    index !== undefined ? details.details[index].price_level : priceLevel;

  const { colors } = useTheme();

  return (
    <>
      <FontAwesome
        name="dollar"
        size={size}
        color={colors.text}
        style={
          checkPriceLevel >= 1 ? styles.showDollarOne : styles.hideDollarOne
        }
      />
      <FontAwesome
        name="dollar"
        size={size}
        color={colors.text}
        style={
          checkPriceLevel >= 2 ? styles.showDollarTwo : styles.hideDollarTwo
        }
      />
      <FontAwesome
        name="dollar"
        size={size}
        color={colors.text}
        style={
          checkPriceLevel >= 3 ? styles.showDollarThree : styles.hideDollarThree
        }
      />
      <FontAwesome
        name="dollar"
        size={size}
        color={colors.text}
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
