import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const PoweredByGoogle = () => {
  const theme = useTheme();

  return (
    <View style={styles.poweredByGoogle}>
      {theme.dark ? (
        <Image
          source={require('../images/powered_by_google_on_non_white.png')}
        />
      ) : (
        <Image source={require('../images/powered_by_google_on_white.png')} />
      )}
    </View>
  );
};

export default PoweredByGoogle;

const styles = StyleSheet.create({
  poweredByGoogle: {
    alignItems: 'center',
  },
});
