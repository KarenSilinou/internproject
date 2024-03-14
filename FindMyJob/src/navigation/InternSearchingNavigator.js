import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import InternDetails from '../screens/internsearching.js/InternDetails';
import LoginForUser from '../screens/internsearching.js/LoginForUser';
import Main from '../screens/internsearching.js/Main';
import SavedInterns from '../screens/internsearching.js/SavedInterns';
import SearchIntern from '../screens/internsearching.js/SearchIntern';
import SignUpForUser from '../screens/internsearching.js/SignUpForUser';
import {TEXT_BLUE} from '../utils/Colors';

const Stack = createStackNavigator();
const InternSearchingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedInterns"
        component={SavedInterns}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="SearchIntern"
        component={SearchIntern}
        options={{
          headerShown: true,
          title: 'Rechercher un stage',
          headerTintColor: TEXT_BLUE,
        }}
      />
      <Stack.Screen
        name="InternDetails"
        component={InternDetails}
        options={{
          headerShown: true,
          title: 'Detail du stage',
          headerTintColor: TEXT_BLUE,
        }}
      />
      <Stack.Screen
        name="LoginForUser"
        component={LoginForUser}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: TEXT_BLUE,
        }}
      />
      <Stack.Screen
        name="SignUpForUser"
        component={SignUpForUser}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: TEXT_BLUE,
        }}
      />
    </Stack.Navigator>
  );
};

export default InternSearchingNavigator;
