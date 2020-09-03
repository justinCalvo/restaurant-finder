import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PoweredByGoogle = () => {
  return (
    <View style={styles.poweredByGoogle}>
      <Image source={require('../images/powered_by_google_on_white.png')} />
    </View>
  );
};

export default PoweredByGoogle;

const styles = StyleSheet.create({
  poweredByGoogle: {
    alignItems: 'center',
  },
});
