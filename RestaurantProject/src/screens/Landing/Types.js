import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import CaretButton from '../../utils/CaretButton';
import Selector from '../../utils/Selector';

const Types = ({
  toggleTypes,
  setToggleTypes,
  setToggleOptions,
  types,
  setTypes,
}) => {
  const [typeName, setTypeName] = useState('Restaurants');

  const handleSetType = () => {
    setToggleTypes(!toggleTypes);
    setToggleOptions(false);
  };

  const updateTypeName = useCallback(() => {
    if (types === 'restaurant') {
      setTypeName('Restaurants');
    } else if (types === 'cafe') {
      setTypeName('Cafes');
    } else {
      setTypeName('Bars');
    }
  }, [types]);

  useEffect(() => {
    updateTypeName();
  }, [updateTypeName, types]);

  return (
    <View style={toggleTypes ? styles.container : null}>
      <CaretButton
        toggle={toggleTypes}
        handleSetting={handleSetType}
        title="Where to?"
      />
      <View style={styles.typesContainer}>
        <Text style={styles.text}>{typeName}</Text>
      </View>
      <Selector
        toggle={toggleTypes}
        value={types}
        setValue={setTypes}
        title="Set Type"
        labels={['Restaurants', 'Cafes', 'Bars']}
        values={['restaurant', 'cafe', 'bar']}
      />
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 2,
  },
  typesContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C2938',
  },
});

export default Types;
