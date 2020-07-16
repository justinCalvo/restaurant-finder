import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details = ({ restaurants, index }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{restaurants[index].name}</Text>
      <Text>
        Address: {'\n'}
        {restaurants[index].formatted_address}
      </Text>
      <Text>Price Level: {restaurants[index].price_level}</Text>
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

export default Details;
