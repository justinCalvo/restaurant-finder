import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Routes } from '../constants/NavConst';

import Home from '../screens/Landing/Home';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerStyle={{
        backgroundColor: 'transparent',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name={Routes.Home} component={Home} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
