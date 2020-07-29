import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './constants/NavConst';
import MainStack from './navigation/MainStack';
import PhotosModal from './screens/Modal/PhotosModal';
console.disableYellowBox = true;
const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
