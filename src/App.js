/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator';
import {AuthProvider} from './context/AuthContext';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
