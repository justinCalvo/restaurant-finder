import React from 'react';
import { SafeAreaView, Text, StyleSheet, Dimensions } from 'react-native';

const MatchDetails = ({ route }) => {
  console.log(route.params);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
});

export default MatchDetails;
