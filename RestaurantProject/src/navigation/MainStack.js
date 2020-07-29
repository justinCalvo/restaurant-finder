import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Landing/Home';
import CityInput from '../screens/Landing/CityInput';
import Restaurants from '../screens/Main/Restaurants';
import ModalScreen from '../screens/Modal/ModalScreen';
import { Routes } from '../constants/NavConst';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ title: null }}
      />
      <Stack.Screen
        name={Routes.CityInput}
        component={CityInput}
        options={{ title: null }}
      />
      <Stack.Screen
        name={Routes.Restaurants}
        component={Restaurants}
        options={{ title: null, headerLeft: null, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
