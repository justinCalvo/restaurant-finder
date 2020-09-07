import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { Picker } from '@react-native-community/picker';

const Selector = ({ toggle, value, setValue, title, labels, values }) => {
  const handlePicker = (itemValue, setNum) => {
    setNum(itemValue);
  };

  return (
    <>
      {toggle ? (
        <View style={styles.pickers}>
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              handlePicker(itemValue, setValue)
            }>
            <Picker.Item label={title} value={values[0]} />
            <Picker.Item label={labels[0]} value={values[0]} />
            <Picker.Item label={labels[1]} value={values[1]} />
            <Picker.Item label={labels[2]} value={values[2]} />
            <Picker.Item label={labels[3]} value={values[3]} />
            <Picker.Item label={labels[4]} value={values[4]} />
          </Picker>
        </View>
      ) : null}
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  picker: {
    width: width / 4,
  },
  pickers: {
    justifyContent: 'flex-end',
  },
});

export default Selector;