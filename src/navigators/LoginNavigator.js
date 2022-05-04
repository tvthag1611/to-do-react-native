import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';

const LoginStack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="Login" component={Login} />
    </LoginStack.Navigator>
  );
}
