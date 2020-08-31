/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Routes } from '../constants/NavConst';

import Home from '../screens/Landing/Home';
import { HomeDrawerContent } from './HomeDrawerContent';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={{
        backgroundColor: '#fafafa',
      }}
      drawerContent={props => <HomeDrawerContent {...props} />}>
      <Drawer.Screen name={Routes.Home} component={Home} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
