import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Landing/Home';
import Tabs from './Tabs';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Current Session" component={Tabs} />
      {/* <Drawer.Screen name="Leave Session" component={Home} /> */}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
