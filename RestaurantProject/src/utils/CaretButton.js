import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const CaretButton = ({ toggle, handleSetting, title }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontWeight: 'bold',
      fontSize: 18,
      color: colors.text,
    },
  });

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

export default CaretButton;
