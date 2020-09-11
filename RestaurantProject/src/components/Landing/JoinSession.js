import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const JoinSession = () => {
  const [token, setToken] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setToken}
        value={token}
        placeholder="enter token"
        returnKeyType="go"
        autoCorrect={false}
        onSubmitEditing={() => {}}
        blurOnSubmit={false}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 50,
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#1C2938',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#1C2938',
  },
});

export default JoinSession;
