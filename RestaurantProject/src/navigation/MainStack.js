import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Landing/Home';
import { Routes } from '../constants/NavConst';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerLeft: null,
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ title: null }}
      />
      <Stack.Screen name={Routes.Restaurants} component={Tabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
