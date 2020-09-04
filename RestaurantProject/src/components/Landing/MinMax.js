import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Text style={styles.text}>
            Set Min <Icon name="caret-down" size={20} color="#cb3737" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSetMax()}>
          <Text style={styles.text}>
            Set Max <Icon name="caret-down" size={20} color="#cb3737" />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceContainer}>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
          <PriceRating priceLevel={min} size={20} />
        </View>
        <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
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
  picker: {
    width: width / 4,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  pickers: {
    justifyContent: 'flex-end',
  },
});

export default MinMax;
