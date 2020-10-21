import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      paddingRight: hp('1.1%'),
      paddingLeft: hp('0.65%'),
    },
    data: {
      fontSize: hp('2%'),
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
        <FontAwesome name={buttonTitle} size={hp('1.7%')} color="#cb3737" />
        <View style={styles.dataContainer}>
          <Text style={[styles.data, styles.dataTouchable]}>{buttonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlusMinusButton;
