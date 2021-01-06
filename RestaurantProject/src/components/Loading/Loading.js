import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ee6f57" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingBottom: hp('14.3%'),
  },
});

export default Loading;
