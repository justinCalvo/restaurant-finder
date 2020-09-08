import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CaretButton = ({ toggle, handleSetting, title }) => {
  return (
    <TouchableOpacity onPress={() => handleSetting()}>
      <Text style={styles.text}>
        {title}{' '}
        <Icon
          name={toggle ? 'caret-up' : 'caret-down'}
          size={20}
          color="#cb3737"
        />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C2938',
  },
});

export default CaretButton;
