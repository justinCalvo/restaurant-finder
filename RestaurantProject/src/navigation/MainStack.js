import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Landing/Home';
import { Routes } from '../constants/NavConst';
import Tabs from './Tabs';
import MatchDetails from '../screens/Matches/MatchDetails';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ title: null }}
      />
      <Stack.Screen
        name={Routes.Restaurants}
        component={Tabs}
        options={{ headerLeft: null }}
      />
      <Stack.Screen name={Routes.MatchDetails} component={MatchDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;
