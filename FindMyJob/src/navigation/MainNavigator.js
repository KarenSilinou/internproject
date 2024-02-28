import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InternPostingNavigator from './InternPostingNavigator';
import InternSearchingNavigator from './InternSearchingNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import SelectUser from '../screens/onboarding/SelectUser';
import Splash from '../screens/onboarding/Splash';
import DashboardForCompany from '../screens/internposting/DashboardForCompany';
import AddIntern from '../screens/internposting/tabs/AddIntern';
import EditIntern from '../screens/internposting/tabs/EditIntern';
import UpdateProfileForCompany from '../screens/internposting/UpdateProfileForCompany';
import ChangeProfilePicForCompany from '../screens/internposting/ChangeProfilePicForCompany';

const STACK = createStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="AddIntern"
          component={AddIntern}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="EditIntern"
          component={EditIntern}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="UpdateProfileForCompany"
          component={UpdateProfileForCompany}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="ChangeProfilePicForCompany"
          component={ChangeProfilePicForCompany}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="DashboardForCompany"
          component={DashboardForCompany}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="SelectUser"
          component={SelectUser}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="InternPostingNavigator"
          component={InternPostingNavigator}
          options={{headerShown: false}}
        />

        <STACK.Screen
          name="InternSearchingNavigator"
          component={InternSearchingNavigator}
          options={{headerShown: false}}
        />
      </STACK.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
