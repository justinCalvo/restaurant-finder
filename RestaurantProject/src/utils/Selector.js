import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { Picker } from '@react-native-community/picker';
import { useTheme } from '@react-navigation/native';

const Selector = ({ toggle, value, setValue, title, labels, values }) => {
  const handlePicker = (itemValue, setNum) => {
    setNum(itemValue);
  };

  const { colors } = useTheme();

  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    picker: {
      width: width / 3.8,
    },
    pickers: {
      justifyContent: 'flex-end',
    },
    pickerText: {
      color: colors.text,
    },
  });

  return (
    <>
      {toggle ? (
        <View style={styles.pickers}>
          <Picker
            selectedValue={value}
            style={styles.picker}
            itemStyle={styles.pickerText}
            onValueChange={(itemValue, itemIndex) =>
              handlePicker(itemValue, setValue)
            }>
            <Picker.Item label={title} value={values[0]} />
            <Picker.Item label={labels[0]} value={values[0]} />
            <Picker.Item label={labels[1]} value={values[1]} />
            <Picker.Item label={labels[2]} value={values[2]} />
            {labels.length > 3 ? (
              <Picker.Item label={labels[3]} value={values[3]} />
            ) : null}
            {labels.length > 4 ? (
              <Picker.Item label={labels[4]} value={values[4]} />
            ) : null}
          </Picker>
        </View>
      ) : null}
    </>
  );
};

export default Selector;
