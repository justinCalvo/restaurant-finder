import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import Icon from 'react-native-vector-icons/Ionicons';

import { Routes } from '../../constants/NavConst';

import JoinSession from '../../components/Landing/JoinSession';

const Landing = ({ navigation }) => {
  const [toggleJoinSession, setToggleJoinSession] = useState(false);

  const handleJoinSessionInput = () => {
    setToggleJoinSession(!toggleJoinSession);
  };

  const theme = useTheme();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: wp('100%'),
      height: hp('100%'),
      flex: 1,
      alignItems: 'center',
    },
    text: {
      paddingVertical: hp('1.1%'),
      fontSize: hp('3.1%'),
      fontWeight: 'bold',
      color: colors.text,
    },
    header: {
      fontSize: hp('4.9%'),
      fontWeight: 'bold',
      alignItems: 'center',
      color: colors.text,
    },
    buttonContainer: {
      height: hp('65%'),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    topContainer: {
      height: hp('20%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      paddingVertical: hp('1.1%'),
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraScrollHeight={hp('2.3%')}>
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
