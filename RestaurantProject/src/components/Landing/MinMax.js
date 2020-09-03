import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-community/picker';

import PriceRating from '../../utils/PriceRating';

const MinMax = ({ min, setMin, max, setMax }) => {
  const [toggleMin, setToggleMin] = useState(false);
  const [toggleMax, setToggleMax] = useState(false);

  const handlePicker = (itemValue, setNum, setToggleNum) => {
    setNum(itemValue);
    setTimeout(() => {
      setToggleNum(false);
    }, 200);
  };

  const handleSetMin = () => {
    setToggleMax(false);
    setToggleMin(!toggleMin);
  };

  const handleSetMax = () => {
    setToggleMin(false);
    setToggleMax(!toggleMax);
  };

  useEffect(() => {
    if (max < min) {
      setMax(min);
    }
    if (min > max) {
      setMin(max);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.minMaxContainer}>
        <TouchableOpacity onPress={() => handleSetMin()}>
          <Text style={styles.text}>Set Min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSetMax()}>
          <Text style={styles.text}>Set Max</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceContainer}>
        <View style={[styles.dollarSigns, styles.minDollarSigns]}>
          <PriceRating priceLevel={min} size={20} />
        </View>
        <View style={[styles.dollarSigns, styles.maxDollarSigns]}>
          <PriceRating priceLevel={max} size={20} />
        </View>
      </View>
      <View style={styles.pickerContainer}>
        {toggleMin ? (
          <View style={styles.pickers}>
            <Picker
              selectedValue={min}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                handlePicker(itemValue, setMin, setToggleMin)
              }>
              <Picker.Item label="Min" value="1" />
              <Picker.Item label="$" value="1" />
              <Picker.Item label="$$" value="2" />
              <Picker.Item label="$$$" value="3" />
              <Picker.Item label="$$$$" value="4" />
            </Picker>
          </View>
        ) : null}
        {toggleMax ? (
          <View style={styles.pickers}>
            <Picker
              selectedValue={max}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                handlePicker(itemValue, setMax, setToggleMax)
              }>
              <Picker.Item label="Max" value="1" />
              <Picker.Item label="$" value="1" />
              <Picker.Item label="$$" value="2" />
              <Picker.Item label="$$$" value="3" />
              <Picker.Item label="$$$$" value="4" />
            </Picker>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 5,
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
  },
  priceContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 70,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  dollarSigns: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
  },
  minDollarSigns: {
    justifyContent: 'flex-start',
  },
  maxDollarSigns: {
    justifyContent: 'flex-end',
  },
  picker: {
    width: width / 3,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickers: {
    justifyContent: 'flex-end',
  },
});

export default MinMax;
