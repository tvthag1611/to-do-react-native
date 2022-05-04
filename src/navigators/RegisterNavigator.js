import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../screens/Register';

const RegisterStack = createStackNavigator();

export default function RegisterNavigator() {
  return (
    <RegisterStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RegisterStack.Screen name="Register" component={Register} />
    </RegisterStack.Navigator>
  );
}
