import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import { Routes } from '../constants/NavConst';
import { useSelector } from 'react-redux';

import MainScreen from '../screens/Main/MainScreen';
import Matches from '../components/Matches/Matches';

import { Sizes } from '../constants/ResponsiveSizes';

const Tabs = createMaterialTopTabNavigator();

const AppTabs = () => {
  const matches = useSelector(state => state.matches);
  const types = useSelector(state => state.types);

  const { colors } = useTheme();

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
          return (
            <Ionicons
              name={iconName}
              size={Sizes.hp_full > 1000 ? Sizes.hp18 : Sizes.hp25}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        showIcon: true,
        indicatorStyle: { backgroundColor: '#ee6f57' },
        activeTintColor: '#ee6f57',
        inactiveTintColor: colors.text,
        style: { backgroundColor: colors.background },
        labelStyle: { fontSize: Sizes.hp12 },
        tabStyle: { height: Sizes.hp76 },
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
