import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreen from './Drawer';

const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Drawer" component={DrawerScreen} />
    </Drawer.Navigator>
  );
};

export default Main;
