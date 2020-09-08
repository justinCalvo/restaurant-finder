import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Routes } from '../constants/NavConst';
import { useSelector } from 'react-redux';

import MainScreen from '../screens/Main/MainScreen';
import Matches from '../components/Matches/Matches';

const Tabs = createMaterialTopTabNavigator();

const AppTabs = () => {
  const matches = useSelector(state => state.matches);
  const types = useSelector(state => state.types);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === Routes.Place) {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === Routes.Matches) {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        showIcon: true,
        indicatorStyle: { backgroundColor: '#ee6f57' },
        activeTintColor: '#ee6f57',
        inactiveTintColor: '#1C2938',
      }}
      swipeEnabled={false}
      lazy={false}>
      <Tabs.Screen
        name={Routes.Place}
        component={MainScreen}
        options={{ title: types.typeName }}
      />
      {/* TODO: Fix tab bar badges, currently not displaying with top tab bar */}
      <Tabs.Screen
        name={Routes.Matches}
        component={Matches}
        options={{
          tabBarBadge:
            matches.newMatchesCounter === 0 ? null : matches.newMatchesCounter,
        }}
      />
    </Tabs.Navigator>
  );
};

export default AppTabs;
