import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Preferences from '../../components/Landing/Preferences';

import PlusMinusButton from '../../utils/PlusMinusButton';

const PreferencesScreen = ({
  min,
  setMin,
  max,
  setMax,
  setMeters,
  toggleOptions,
  setToggleOptions,
  setToggleTypes,
}) => {
  useEffect(() => {
    if (toggleOptions) {
      setToggleTypes(false);
    }
  }, [setToggleTypes, toggleOptions]);

  return (
    <View style={styles.container}>
      {toggleOptions ? (
        <Preferences
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          setMeters={setMeters}
        />
      ) : null}
      <PlusMinusButton
        bool={toggleOptions}
        setBool={setToggleOptions}
        buttonName="Select Preferences"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PreferencesScreen;
