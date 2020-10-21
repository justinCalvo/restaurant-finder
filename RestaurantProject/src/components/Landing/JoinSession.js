import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Clipboard from '@react-native-community/clipboard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const JoinSession = () => {
  const [token, setToken] = useState('');
  const [wasPasted, setWasPasted] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setToken(text);
    setWasPasted(true);
  };

  const deleteToken = () => {
    setToken('');
    setWasDeleted(true);
  };

  const reset = useCallback(() => {
    if (wasPasted) {
      setTimeout(() => {
        setWasPasted(false);
      }, 1000);
    }
    if (wasDeleted) {
      setTimeout(() => {
        setWasDeleted(false);
      }, 1000);
    }
  }, [wasPasted, wasDeleted]);

  useEffect(() => {
    reset();
  }, [reset, wasPasted, wasDeleted]);

  const theme = useTheme();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
    },
    textInput: {
      fontSize: hp('2%'),
      borderBottomWidth: wp('0.25%'),
      borderColor: colors.text,
      paddingVertical: hp('1.1%'),
      textAlign: 'center',
      color: colors.text,
    },
    inputWidth: {
      width: wp('65%'),
      paddingHorizontal: hp('1.1%'),
    },
  });

  return (
    <>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={fetchCopiedText}>
          <FontAwesome
            name={wasPasted ? 'check-square' : 'paste'}
            size={hp('2.5%')}
            color={wasPasted ? 'green' : colors.text}
          />
        </TouchableOpacity>
        <View style={styles.inputWidth}>
          <TextInput
            style={styles.textInput}
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
            placeholderTextColor={colors.text}
            onChangeText={setToken}
            value={token}
            placeholder="enter token"
            returnKeyType="go"
            autoCorrect={false}
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
          />
        </View>
        <TouchableOpacity onPress={deleteToken}>
          <Ionicons
            name={wasDeleted ? 'close-circle' : 'close-circle-outline'}
            size={hp('3.4%')}
            color={wasDeleted ? '#cb3737' : colors.text}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default JoinSession;
