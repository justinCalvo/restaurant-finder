import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Details from '../components/Details';

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      {/* Matches */}
      {/* Photos */}
      <Details restaurants={route.params.restaurants} index={index} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Restaurants;
