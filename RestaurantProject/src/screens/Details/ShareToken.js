import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Routes } from '../../constants/NavConst';
import { useTheme } from '@react-navigation/native';

import Clipboard from '@react-native-community/clipboard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ShareToken = ({ navigation }) => {
  const [dataReady, setDataReady] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);

  const places = useSelector(state => state.places);
  const details = useSelector(state => state.details);

  const handleDataReady = useCallback(() => {
    if (details.details.length > 0) {
      setDataReady(true);
    } else {
      setDataReady(false);
    }
  }, [details.details]);

  useEffect(() => {
    handleDataReady();
  });

  const copyToClipboard = () => {
    Clipboard.setString(places.sessionID);
    setWasCopied(true);
  };

  const resetWasCopied = useCallback(() => {
    if (wasCopied) {
      setTimeout(() => {
        setWasCopied(false);
      }, 3000);
    }
  }, [wasCopied]);

  useEffect(() => {
    resetWasCopied();
  }, [resetWasCopied, wasCopied]);

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: wp('100%'),
      height: hp('100%'),
    },
    sessionIDContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 4,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: hp('1.1%'),
      flexDirection: 'row',
    },
    continue: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    sessionToken: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: hp('1.1%'),
      alignItems: 'center',
      width: wp('71%'),
    },
    headerText: {
      paddingVertical: hp('1.1%'),
      fontSize: hp('3.2%'),
      fontWeight: 'bold',
      color: colors.text,
    },
    text: {
      fontSize: hp('2%'),
      fontWeight: 'bold',
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sessionIDContainer}>
        <Text style={styles.headerText}>Share your token:</Text>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <View style={styles.sessionToken}>
            <Text style={styles.text}>{places.sessionID}</Text>
            {wasCopied ? <Text style={styles.text}>Copied!</Text> : null}
            <FontAwesome
              name={wasCopied ? 'check-square' : 'copy'}
              size={hp('2.7%')}
              color={wasCopied ? 'green' : colors.text}
            />
          </View>
        </TouchableOpacity>
      </View>
      {dataReady ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Place)}>
            <View style={styles.continue}>
              <Text style={styles.text}>Continue</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={hp('3.4%')}
                color={colors.text}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default ShareToken;
