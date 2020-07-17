import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PriceLevel = ({ restaurants, index }) => {
  const checkPriceLevel = restaurants[index].price_level;

  return (
    <View style={styles.container}>
      <Icon
        name="dollar"
        size={25}
        color="black"
        style={
          checkPriceLevel >= 1 ? styles.showDollarOne : styles.hideDollarOne
        }
      />
      <Icon
        name="dollar"
        size={25}
        color="black"
        style={
          checkPriceLevel >= 2 ? styles.showDollarTwo : styles.hideDollarTwo
        }
      />
      <Icon
        name="dollar"
        size={25}
        color="black"
        style={
          checkPriceLevel >= 3 ? styles.showDollarThree : styles.hideDollarThree
        }
      />
      <Icon
        name="dollar"
        size={25}
        color="black"
        style={
          checkPriceLevel >= 4 ? styles.showDollarFour : styles.hideDollarFour
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
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

export default PriceLevel;
