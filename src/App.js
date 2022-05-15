/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator';
import Toast from 'react-native-toast-message';
import {store} from './store';
import {Provider} from 'react-redux';
import {GoogleSignin} from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setItemAuth} from './store/auth';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '195849499957-a8q4fe91gmitv9idttpvds23aml9dkh1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const getLogined = async () => {
    const tk = await AsyncStorage.getItem('token');

    if (tk) {
      console.log(tk);

      store.dispatch(setItemAuth({isAuthenticated: true}));
    }
  };

  getLogined();

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
