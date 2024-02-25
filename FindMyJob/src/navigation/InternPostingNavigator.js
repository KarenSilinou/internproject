import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpForCompany from '../screens/internposting/SignUpForCompany';
import LoginForCompany from '../screens/internposting/LoginForCompany';
import DashboardForCompany from '../screens/internposting/DashboardForCompany';

const STACK = createStackNavigator();
const InternPostingNavigator = () => {
  return (
    <STACK.Navigator>
      <STACK.Screen
        name="LoginForCompany"
        component={LoginForCompany}
        options={{headerShown: false}}
      />

      <STACK.Screen
        name="SignUpForCompany"
        component={SignUpForCompany}
        options={{headerShown: false}}
      />

      <STACK.Screen
        name="DashboardForCompany"
        component={DashboardForCompany}
        options={{headerShown: false}}
      />
    </STACK.Navigator>
  );
};

export default InternPostingNavigator;
