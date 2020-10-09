import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const DislikeButton = ({ size, LeftActions }) => {
  const { colors } = useTheme();

  return (
    <>
      <TouchableOpacity onPress={LeftActions}>
        <Icon name="close-circle" size={size} color={colors.text} />
      </TouchableOpacity>
    </>
  );
};

export default DislikeButton;
