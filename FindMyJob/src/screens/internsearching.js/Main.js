import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerScreen from './Drawer';

const CustomDrawerNavigator = createDrawerNavigator(); // Renommez le composant Drawer en CustomDrawerNavigator

const Main = () => {
  return (
    <CustomDrawerNavigator.Navigator>
      <CustomDrawerNavigator.Screen name="Drawer" component={DrawerScreen} />
    </CustomDrawerNavigator.Navigator>
  );
};

export default Main;
