import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';

import PriceRating from '../../utils/PriceRating';
import Selector from '../../utils/Selector';
import CaretButton from '../../utils/CaretButton';

const Preferences = ({
  min,
  setMin,
  max,
  setMax,
  setMeters,
  type,
  setType,
}) => {
  const [togglePriceRange, setTogglePriceRange] = useState(true);
  const [toggleRadius, setToggleRadius] = useState(false);
  const [toggleTypes, setToggleTypes] = useState(false);

  const [miles, setMiles] = useState('5 Miles');

  const types = useSelector(state => state.types);

  const dispatch = useDispatch();

  const handleSetRadius = () => {
    setToggleRadius(!toggleRadius);
    setTogglePriceRange(false);
    setToggleTypes(false);
  };

  const handleSetPriceRange = () => {
    setTogglePriceRange(!togglePriceRange);
    setToggleRadius(false);
    setToggleTypes(false);
  };

  const handleSetType = () => {
    setToggleTypes(!toggleTypes);
    setToggleRadius(false);
    setTogglePriceRange(false);
  };

  const convertMilesToMeters = useCallback(() => {
    const newMeters = miles.slice(0, 2) * 1609.34;
    setMeters(newMeters);
  }, [miles, setMeters]);

  useEffect(() => {
    if (max < min) {
      setMax(min);
    }
    if (min > max) {
      setMin(max);
    }
  }, [max, min, setMax, setMin]);

  useEffect(() => {
    convertMilesToMeters();
  }, [convertMilesToMeters, miles]);

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
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Selector
          toggle={toggleTypes}
          value={type}
          setValue={setType}
          title="Set Type"
          labels={['Restaurants', 'Cafes', 'Bars']}
          values={['restaurant', 'cafe', 'bar']}
        />
        <Selector
          toggle={toggleRadius}
          value={miles}
          setValue={setMiles}
          title="Set Miles"
          labels={['5', '10', '15', '20', '25']}
          values={['5 Miles', '10 Miles', '15 Miles', '20 Miles', '25 Miles']}
        />
        <Selector
          toggle={togglePriceRange}
          value={min}
          setValue={setMin}
          title="Set Min"
          labels={['$', '$$', '$$$', '$$$$']}
          values={['1', '2', '3', '4']}
        />
        <Selector
          toggle={togglePriceRange}
          value={max}
          setValue={setMax}
          title="Set Max"
          labels={['$$$$', '$$$', '$$', '$']}
          values={['4', '3', '2', '1']}
        />
      </View>
      <CaretButton
        toggle={togglePriceRange}
        handleSetting={handleSetPriceRange}
        title="Price Range"
      />
      <View style={styles.priceContainer}>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          <PriceRating priceLevel={min} size={16} />
        </View>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          <PriceRating priceLevel={max} size={16} />
        </View>
      </View>
      <View style={styles.minMaxContainer}>
        <CaretButton
          toggle={toggleTypes}
          handleSetting={handleSetType}
          title="Where to?"
        />
        <CaretButton
          toggle={toggleRadius}
          handleSetting={handleSetRadius}
          title="Radius"
        />
      </View>
      <View style={styles.priceContainer}>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          <Text style={styles.valueText}>{types.typeName}</Text>
        </View>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          <Text style={styles.valueText}>{miles}</Text>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 3,
    alignItems: 'center',
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width / 1.5,
  },
  priceContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    width: width / 1.5,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C2938',
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1C2938',
  },
  dollarSigns: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  minMaxDollarSigns: {
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  optionsContainer: {
    paddingVertical: 10,
  },
});

export default Preferences;
