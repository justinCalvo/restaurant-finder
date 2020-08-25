import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Stars = ({ stars, next, size }) => {
  const theStars = next === undefined ? stars : stars[next];

  return (
    <>
      <Icon name={theStars[0]} size={size} color="#ee6f57" />
      <Icon name={theStars[1]} size={size} color="#ee6f57" />
      <Icon name={theStars[2]} size={size} color="#ee6f57" />
      <Icon name={theStars[3]} size={size} color="#ee6f57" />
      <Icon name={theStars[4]} size={size} color="#ee6f57" />
    </>
  );
};

export default Stars;
