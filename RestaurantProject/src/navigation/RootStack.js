import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../constants/NavConst';
import MainStack from './MainStack';
import PhotosModal from '../screens/Modal/PhotosModal';
import MatchesModal from '../screens/Modal/MatchesModal';

const RootStack = createStackNavigator();

const Root = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode="modal">
      <RootStack.Screen name={Routes.Main} component={MainStack} />
      <RootStack.Screen name={Routes.PhotosModal} component={PhotosModal} />
      <RootStack.Screen name={Routes.MatchesModal} component={MatchesModal} />
    </RootStack.Navigator>
  );
};

export default Root;
