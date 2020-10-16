import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Tabs from './Tabs';
import { DrawerContent } from './components/DrawerContent';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Current Session" component={Tabs} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
