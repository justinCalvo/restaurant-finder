import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Routes } from '../constants/NavConst';
import { useSelector } from 'react-redux';

import Restaurants from '../screens/Main/Restaurants';
import Matches from '../components/Matches/Matches';

const AppTabs = createBottomTabNavigator();

const Tabs = () => {
  const matches = useSelector(state => state.matches);

  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === Routes.Restaurants) {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === Routes.Matches) {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      lazy={false}>
      <AppTabs.Screen name={Routes.Restaurants} component={Restaurants} />
      <AppTabs.Screen
        name={Routes.Matches}
        component={Matches}
        options={{
          tabBarBadge:
            matches.newMatchesCounter === 0 ? null : matches.newMatchesCounter,
        }}
      />
    </AppTabs.Navigator>
  );
};

export default Tabs;
