import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {TEXT_BLUE} from '../../utils/Colors';
import CustomDrawer from './CustomDrawer';
import DrawerScreen from './Drawer';

const CustomDrawerNavigator = createDrawerNavigator(); // Renommez le composant Drawer en CustomDrawerNavigator

const Main = () => {
  return (
    <CustomDrawerNavigator.Navigator
      screenOptions={{headerTintColor: TEXT_BLUE}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <CustomDrawerNavigator.Screen
        name="Drawer"
        component={DrawerScreen}
        options={{title: 'INTERNGLOBE'}}
      />
    </CustomDrawerNavigator.Navigator>
  );
};

export default Main;
