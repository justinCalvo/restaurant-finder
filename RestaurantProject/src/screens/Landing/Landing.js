import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Sizes } from '../../constants/ResponsiveSizes';

import { useDispatch } from 'react-redux';
import { updatePhotoSize } from '../../redux/actions/photoSizeActions';

// import Icon from 'react-native-vector-icons/Ionicons';

import { Routes } from '../../constants/NavConst';

import JoinSession from '../../components/Landing/JoinSession';

const Landing = ({ navigation }) => {
  const [toggleJoinSession, setToggleJoinSession] = useState(false);

  const dispatch = useDispatch();

  const handleJoinSessionInput = () => {
    setToggleJoinSession(!toggleJoinSession);
  };

  const fixPhotoSize = useCallback(() => {
    if (Sizes.hp_full < Sizes.wp_full * 2) {
      const normalSize = Sizes.hp1_3rd;
      const condensedSize = Sizes.hp1_4th;
      dispatch(updatePhotoSize(normalSize, condensedSize));
    } else {
      dispatch(updatePhotoSize(Sizes.wp4_5th, Sizes.wp_half));
    }
  }, [dispatch]);

  useEffect(() => {
    fixPhotoSize();
  }, [fixPhotoSize]);

  const theme = useTheme();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    text: {
      paddingVertical: Sizes.hp10,
      fontSize: Sizes.hp28,
      fontWeight: 'bold',
      color: colors.text,
    },
    header: {
      fontSize: Sizes.hp44,
      fontWeight: 'bold',
      alignItems: 'center',
      color: colors.text,
    },
    buttonContainer: {
      height: Sizes.hp_half,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    topContainer: {
      height: Sizes.hp1_5th,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      paddingVertical: Sizes.hp10,
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraScrollHeight={Sizes.hp20}>
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
