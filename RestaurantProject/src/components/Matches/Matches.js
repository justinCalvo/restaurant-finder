import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Matches = ({ displayMatches }) => {
  console.log('this: ', displayMatches);
  return (
    <View style={styles.container}>
      <Text style={styles.banner}>lol</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  banner: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Matches;
