import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PriceRating from '../../utils/PriceRating';
import Selector from '../../utils/Selector';
import CaretButton from '../../utils/CaretButton';

const Preferences = ({ min, setMin, max, setMax, setMeters }) => {
  const [toggleMin, setToggleMin] = useState(false);
  const [toggleMax, setToggleMax] = useState(false);
  const [toggleRadius, setToggleRadius] = useState(false);

  const [miles, setMiles] = useState('5 Miles');

  const handleSetRadius = () => {
    setToggleRadius(!toggleRadius);
    setToggleMax(false);
    setToggleMin(false);
  };

  const handleSetMin = () => {
    setToggleMin(!toggleMin);
    setToggleRadius(false);
  };

  const handleSetMax = () => {
    setToggleMax(!toggleMax);
    setToggleRadius(false);
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

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Selector
          toggle={toggleRadius}
          value={miles}
          setValue={setMiles}
          title="Set Miles"
          labels={['5', '10', '15', '20', '25']}
          values={['5 Miles', '10 Miles', '15 Miles', '20 Miles', '25 Miles']}
        />
        <Selector
          toggle={toggleMin}
          value={min}
          setValue={setMin}
          title="Set Min"
          labels={['Min', '$', '$$', '$$$', '$$$$']}
          values={['0', '1', '2', '3', '4']}
        />
        <Selector
          toggle={toggleMax}
          value={max}
          setValue={setMax}
          title="Set Max"
          labels={['Min', '$', '$$', '$$$', '$$$$']}
          values={['0', '1', '2', '3', '4']}
        />
      </View>
      <CaretButton
        toggle={toggleRadius}
        handleSetting={handleSetRadius}
        title="Set Radius"
      />
      <View style={styles.radiusContainer}>
        <Text style={styles.text}>{miles}</Text>
      </View>
      <View style={styles.minMaxContainer}>
        <CaretButton
          toggle={toggleMin}
          handleSetting={handleSetMin}
          title="Set Min"
        />
        <CaretButton
          toggle={toggleMax}
          handleSetting={handleSetMax}
          title="Set Max"
        />
      </View>
      <View style={styles.priceContainer}>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          {min === '0' ? (
            <Text style={styles.text}>Min</Text>
          ) : (
            <PriceRating priceLevel={min} size={20} />
          )}
        </View>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          {max === '0' ? (
            <Text style={styles.text}>Min</Text>
          ) : (
            <PriceRating priceLevel={max} size={20} />
          )}
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
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C2938',
  },
  dollarSigns: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
  },
  minMaxDollarSigns: {
    justifyContent: 'center',
    right: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  radiusContainer: {
    paddingVertical: 10,
  },
});

export default Preferences;
