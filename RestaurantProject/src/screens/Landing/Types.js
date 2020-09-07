import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';

import CaretButton from '../../utils/CaretButton';
import Selector from '../../utils/Selector';

const Types = ({
  toggleTypes,
  setToggleTypes,
  setToggleOptions,
  type,
  setType,
  setToggleCitySearch,
}) => {
  const types = useSelector(state => state.types);

  const dispatch = useDispatch();

  const handleSetType = () => {
    setToggleTypes(!toggleTypes);
    setToggleOptions(false);
    setToggleCitySearch(false);
  };

  const updateTypeName = useCallback(() => {
    if (type === 'restaurant') {
      dispatch(updateType('Restaurants'));
    } else if (type === 'cafe') {
      dispatch(updateType('Cafes'));
    } else {
      dispatch(updateType('Bars'));
    }
  }, [dispatch, type]);

  useEffect(() => {
    updateTypeName();
  }, [updateTypeName, type]);

  return (
    <View style={toggleTypes ? styles.container : null}>
      <CaretButton
        toggle={toggleTypes}
        handleSetting={handleSetType}
        title="Where to?"
      />
      <View style={styles.typesContainer}>
        <Text style={styles.text}>{types.typeName}</Text>
      </View>
      <Selector
        toggle={toggleTypes}
        value={type}
        setValue={setType}
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
