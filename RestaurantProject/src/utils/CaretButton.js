import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CaretButton = ({ toggle, handleSetting, title }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontWeight: 'bold',
      fontSize: hp('2%'),
      color: colors.text,
    },
  });

  return (
    <TouchableOpacity onPress={() => handleSetting()}>
      <Text style={styles.text}>
        {title}{' '}
        <Icon
          name={toggle ? 'caret-up' : 'caret-down'}
          size={hp('2.3%')}
          color="#cb3737"
        />
      </Text>
    </TouchableOpacity>
  );
};

export default CaretButton;
