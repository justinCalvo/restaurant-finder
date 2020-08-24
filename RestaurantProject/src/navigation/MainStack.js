import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { Routes } from '../constants/NavConst';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MatchDetails from '../screens/Matches/MatchDetails';
import Drawer from './Drawer';
import HomeDrawer from './HomeDrawer';

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
        component={HomeDrawer}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Routes.Restaurants}
        component={Drawer}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Routes.MatchDetails}
        component={MatchDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
