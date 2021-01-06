import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Sizes } from '../constants/ResponsiveSizes';

const PlusMinusButton = ({ bool, setBool, buttonName }) => {
  const [buttonTitle, setButtonTitle] = useState('plus');

  const handleBool = useCallback(() => {
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

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    viewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dataContainer: {
      paddingRight: Sizes.hp10,
      paddingLeft: Sizes.hp5,
    },
    data: {
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    dataTouchable: {
      color: colors.text,
    },
  });

  return (
    <TouchableOpacity onPress={handleBool}>
      <View style={styles.viewContainer}>
        <FontAwesome name={buttonTitle} size={Sizes.hp15} color="#cb3737" />
        <View style={styles.dataContainer}>
          <Text style={[styles.data, styles.dataTouchable]}>{buttonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlusMinusButton;
