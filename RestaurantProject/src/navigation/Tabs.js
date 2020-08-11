import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Routes } from '../constants/NavConst';

import Restaurants from '../screens/Main/Restaurants';
import MatchesScreen from '../screens/Details/MatchesScreen';

const AppTabs = createBottomTabNavigator();

const Tabs = () => {
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
      }}>
      <AppTabs.Screen name={Routes.Restaurants} component={Restaurants} />
      <AppTabs.Screen
        name={Routes.Matches}
        component={MatchesScreen}
        // TODO: update tab bar badge to work dynamically with matches or remove?
        options={{ tabBarBadge: 3 }}
      />
    </AppTabs.Navigator>
  );
};

export default Tabs;
