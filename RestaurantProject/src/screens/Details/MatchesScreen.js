import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const MatchesScreen = () => {
  const matches = useSelector(state => state.matches);
  console.log('here');
  console.log(matches);
  // console.log(matches.newMatchesCounter);
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

export default MatchesScreen;
