import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Clipboard from '@react-native-community/clipboard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      width: width,
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
    },
    textInput: {
      fontSize: 18,
      borderBottomWidth: 1,
      borderColor: colors.text,
      paddingVertical: 10,
      textAlign: 'center',
      color: colors.text,
    },
    inputWidth: {
      width: width / 1.5,
      paddingHorizontal: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={fetchCopiedText}>
          <FontAwesome
            name={wasPasted ? 'check-square' : 'paste'}
            size={22}
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
            size={30}
            color={wasDeleted ? '#cb3737' : colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinSession;
