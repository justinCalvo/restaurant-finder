import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { Routes } from '../../constants/NavConst';

import JoinSession from '../../components/Landing/JoinSession';

const Landing = ({ navigation }) => {
  const [toggleJoinSession, setToggleJoinSession] = useState(false);

  const handleJoinSessionInput = () => {
    setToggleJoinSession(!toggleJoinSession);
  };

  const theme = useTheme();

  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      flex: 1,
      alignItems: 'center',
    },
    text: {
      paddingVertical: 10,
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    header: {
      fontSize: 44,
      fontWeight: 'bold',
      alignItems: 'center',
      color: colors.text,
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
    // keyboardColor: {
    //   backgroundColor: colors.background,
    // },
    headerContainer: {
      paddingVertical: 10,
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraScrollHeight={20}>
      <View style={styles.buttonContainer}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>WeCide</Text>
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

export default Landing;
