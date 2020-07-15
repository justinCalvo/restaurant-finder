import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import InputLocation from '../screens/InputLocation';
import Restaurants from '../screens/Restaurants';
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
        name={Routes.InputLocation}
        component={InputLocation}
        options={{ title: null }}
      />
      <Stack.Screen
        name={Routes.Restaurants}
        component={Restaurants}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
