import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Routes } from '../constants/NavConst';

import Landing from '../screens/Landing/Landing';
import { HomeDrawerContent } from './components/HomeDrawerContent';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerContent={props => <HomeDrawerContent {...props} />}>
      <Drawer.Screen name={Routes.Landing} component={Landing} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
