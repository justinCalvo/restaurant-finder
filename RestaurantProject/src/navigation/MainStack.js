import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { Routes } from '../constants/NavConst';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MatchDetails from '../screens/Matches/MatchDetails';
import CreateSession from '../screens/Landing/CreateSession';
import ShareToken from '../screens/Details/ShareToken';

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
        name={Routes.Landing}
        component={HomeDrawer}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu-outline" size={30} color="#1C2938" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Routes.Place}
        component={Drawer}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu-outline" size={30} color="#1C2938" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Routes.CreateSession}
        component={CreateSession}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <Ionicons name="arrow-back-outline" size={30} color="#1C2938" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Routes.ShareToken}
        component={ShareToken}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name={Routes.MatchDetails}
        component={MatchDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <Ionicons name="arrow-back-outline" size={30} color="#1C2938" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
