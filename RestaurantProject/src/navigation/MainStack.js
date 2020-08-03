import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Landing/Home';
import Restaurants from '../screens/Main/Restaurants';
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
        name={Routes.Restaurants}
        component={Restaurants}
        options={{
          title: null,
          headerLeft: null,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
