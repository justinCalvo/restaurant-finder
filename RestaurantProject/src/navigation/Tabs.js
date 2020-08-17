import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Routes } from '../constants/NavConst';
import { useSelector } from 'react-redux';

import Restaurants from '../screens/Main/Restaurants';
import MatchesScreen from '../screens/Details/MatchesScreen';
// import { setMatches } from '../redux/actions/matchesActions';

const AppTabs = createBottomTabNavigator();

const Tabs = () => {
  const matches = useSelector(state => state.matches);
  // const dispatch = useDispatch();

  // const resetMatchCounter = async () => {
  //   await dispatch(setMatches(undefined, undefined, matches));
  // };

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
        options={{
          tabBarBadge:
            matches.newMatchesCounter === 0 ? null : matches.newMatchesCounter,
        }}
      />
    </AppTabs.Navigator>
  );
};

export default Tabs;
