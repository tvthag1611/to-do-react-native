import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../utils/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const register = (name, username, email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/register`, {
        name,
        username,
        email,
        password,
      })
      .then((res) => {
        setVerifyToken(res.data.verify_token);
        console.log(res.data.verify_token);
        setIsVerifyOtp(true);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data,
          });
        }
        setIsLoading(false);
      });
  };

  const verifyOtp = async (otp) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${BASE_URL}/register/confirm?token=${verifyToken}`,
        {
          otp,
        },
      );
      if (res) {
        Toast.show({
          type: 'success',
          text1: res.data,
        });
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: error.response.data,
        });
      }
      setIsLoading(false);
      return false;
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        qs.stringify({
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      if (res) {
        console.log(res);
        setToken(res.data.access_token);
        await AsyncStorage.setItem('token', res.data.access_token);
        setIsLoading(false);
        return res.data;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setToken('');
    await AsyncStorage.setItem('token', '');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isVerifyOtp,
        register,
        verifyOtp,
        login,
        token,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
