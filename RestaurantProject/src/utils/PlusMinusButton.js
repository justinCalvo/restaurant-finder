import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PlusMinusButton = ({ bool, setBool, buttonName }) => {
  const [buttonTitle, setButtonTitle] = useState('plus');

  const handleViewReviews = useCallback(() => {
    if (!bool) {
      setBool(true);
    } else {
      setBool(false);
    }
  }, [setBool, bool]);

  const checkViewState = useCallback(() => {
    if (bool) {
      setButtonTitle('minus');
    } else {
      setButtonTitle('plus');
    }
  }, [bool]);

  useEffect(() => {
    checkViewState();
  }, [checkViewState, bool]);

  return (
    <TouchableOpacity onPress={handleViewReviews}>
      <View style={styles.viewContainer}>
        <FontAwesome name={buttonTitle} size={15} color="#cb3737" />
        <View style={styles.reviewContainer}>
          <Text style={[styles.reviews, styles.reviewsTouchable]}>
            {buttonName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewContainer: {
    paddingRight: 10,
    paddingLeft: 5,
  },
  reviews: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewsTouchable: {
    color: '#1C2938',
  },
});

export default PlusMinusButton;
