import React from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ee6f57" />
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingBottom: height / 7,
  },
});

export default Loading;
