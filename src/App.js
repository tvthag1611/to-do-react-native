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
import Toast from 'react-native-toast-message';
import {store} from './store';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
