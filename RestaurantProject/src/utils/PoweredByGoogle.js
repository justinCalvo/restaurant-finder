import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Sizes } from '../constants/ResponsiveSizes';

const DarkImage = () => (
  <>
    {Sizes.hp_full > 1200 ? (
      <Image
        source={require('../images/powered_by_google_on_non_white2x.png')}
      />
    ) : (
      <Image source={require('../images/powered_by_google_on_non_white.png')} />
    )}
  </>
);

const LightImage = () => (
  <>
    {Sizes.hp_full > 1200 ? (
      <Image source={require('../images/powered_by_google_on_white2x.png')} />
    ) : (
      <Image source={require('../images/powered_by_google_on_white.png')} />
    )}
  </>
);

const PoweredByGoogle = () => {
  const theme = useTheme();

  return (
    <View style={styles.poweredByGoogle}>
      {theme.dark ? <DarkImage /> : <LightImage />}
    </View>
  );
};

export default PoweredByGoogle;

const styles = StyleSheet.create({
  poweredByGoogle: {
    alignItems: 'center',
  },
});
