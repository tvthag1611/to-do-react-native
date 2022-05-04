import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Begin from '../screens/Begin';

const BeginStack = createStackNavigator();

export default function BeginNavigator() {
  return (
    <BeginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BeginStack.Screen name="Begin" component={Begin} />
    </BeginStack.Navigator>
  );
}
