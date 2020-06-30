import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import InputLocation from '../screens/InputLocation';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: null }} />
      <Stack.Screen
        name="InputLocation"
        component={InputLocation}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
