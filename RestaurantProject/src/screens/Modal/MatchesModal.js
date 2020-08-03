import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const MatchesModal = () => {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          closeModal();
        }
      }}>
      <SafeAreaView style={styles.container}>
        <Text>Hello</Text>
      </SafeAreaView>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
});

export default MatchesModal;
