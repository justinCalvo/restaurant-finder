import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { Routes } from '../../constants/NavConst';

import JoinSession from '../../components/Landing/JoinSession';

const Landing = ({ navigation }) => {
  const [toggleJoinSession, setToggleJoinSession] = useState(false);

  const handleJoinSessionInput = () => {
    setToggleJoinSession(!toggleJoinSession);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraScrollHeight={20}>
      <View style={styles.buttonContainer}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Rair</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.CreateSession)}>
          <Text style={styles.text}>
            {/* <Icon name="search-sharp" size={24} color="#cb3737" />  */}
            Create Session
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleJoinSessionInput()}>
          <Text style={styles.text}>
            {/* <Icon name="search-sharp" size={24} color="#cb3737" />  */}
            Join Session
          </Text>
        </TouchableOpacity>
      </View>
      {toggleJoinSession ? <JoinSession /> : null}
    </KeyboardAwareScrollView>
  );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  text: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C2938',
  },
  header: {
    fontSize: 44,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#1C2938',
  },
  buttonContainer: {
    width: width,
    height: height / 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topContainer: {
    width: width,
    height: height / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardColor: {
    backgroundColor: '#fafafa',
  },
  headerContainer: {
    paddingVertical: 10,
  },
});

export default Landing;
