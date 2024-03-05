import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Main from '../screens/internsearching.js/Main';
import SearchIntern from '../screens/internsearching.js/SearchIntern';
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
        name="SearchIntern"
        component={SearchIntern}
        options={{
          headerShown: true,
          title: 'Rechercher un stage',
          headerTintColor: TEXT_BLUE,
        }}
      />
    </Stack.Navigator>
  );
};

export default InternSearchingNavigator;
