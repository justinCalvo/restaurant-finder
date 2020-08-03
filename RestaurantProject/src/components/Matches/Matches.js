import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';

const Matches = () => {
  const navigation = useNavigation();

  const openModal = () => {
    navigation.navigate(Routes.MatchesModal);
  };

  return (
    <FlingGestureHandler
      direction={Directions.DOWN}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          openModal();
        }
      }}>
      <View style={styles.container}>
        <Text style={styles.banner}>Matches</Text>
      </View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  banner: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Matches;
