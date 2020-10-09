/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Tabs from './Tabs';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      // drawerStyle={{
      //   backgroundColor: '#fafafa',
      // }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Current Session" component={Tabs} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
