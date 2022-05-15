import {createSlice} from '@reduxjs/toolkit';
import {
  apiLogin,
  apiLoginGoogle,
  apiRegister,
  apiVerifyOtp,
} from '../../api/auth.api';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: '',
  isVerifyOtp: false,
  verifyToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setItemAuth: (state, action) => {
      Object.assign(state, action.payload);
    },
    logout: (state) => {
      state.token = '';
      state.isAuthenticated = false;
      deleteToken();
    },
    loginRemember: (state, action) => {
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
    },
  },
});

export const {setItemAuth, logout, loginRemember} = authSlice.actions;

export default authSlice.reducer;

const setToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

const deleteToken = async () => {
  await AsyncStorage.setItem('token', '');
};

export const loginAsync = (data) => {
  return async (dispatch) => {
    const qsString = qs.stringify(data);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    dispatch(setItemAuth({isLoading: true}));

    return await apiLogin(qsString, config)
      .then(
        (response) => {
          setToken(response.data.access_token);
          dispatch(loginRemember(response.data));
          dispatch(setItemAuth({isLoading: false}));
          return true;
        },
        (error) => {
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data ? error.response.data : error.message,
            });
          }
          dispatch(setItemAuth({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data ? error.response.data : error.message,
          });
        }
        dispatch(setItemAuth({isLoading: false}));
        return false;
      });
  };
};

export const loginGoogleAsync = (idTokenString) => {
  return async (dispatch) => {
    const config = {
      params: {
        idTokenString,
      },
    };

    dispatch(setItemAuth({isLoading: true}));

    return await apiLoginGoogle({}, config)
      .then(
        (response) => {
          setToken(response.data.access_token);
          dispatch(loginRemember(response.data));
          dispatch(setItemAuth({isLoading: false}));
          return true;
        },
        (error) => {
          console.log(error);
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data ? error.response.data : error.message,
            });
          }
          dispatch(setItemAuth({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data ? error.response.data : error.message,
          });
        }
        dispatch(setItemAuth({isLoading: false}));
        return false;
      });
  };
};

export const registerAsync = (data) => {
  return async (dispatch) => {
    dispatch(setItemAuth({isLoading: true}));

    return await apiRegister(data)
      .then(
        (response) => {
          console.log(response.data.verify_token);

          dispatch(setItemAuth({verifyToken: response.data.verify_token}));
          dispatch(setItemAuth({isVerifyOtp: true}));
          dispatch(setItemAuth({isLoading: false}));

          return true;
        },
        (error) => {
          console.log(error);

          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data ? error.response.data : error.message,
            });
          }
          dispatch(setItemAuth({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data ? error.response.data : error.message,
          });
        }
        dispatch(setItemAuth({isLoading: false}));
        return false;
      });
  };
};

export const verifyOtpAsync = (data) => {
  return async (dispatch, getState) => {
    const {verifyToken} = getState().authReducer;

    console.log(verifyToken);

    const config = {
      params: {
        token: verifyToken,
      },
    };

    dispatch(setItemAuth({isLoading: true}));

    return await apiVerifyOtp(data, config)
      .then(
        (response) => {
          Toast.show({
            type: 'success',
            text1: response.data,
          });
          dispatch(setItemAuth({isLoading: false}));
          return true;
        },
        (error) => {
          console.log(error);
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data ? error.response.data : error.message,
            });
          }
          dispatch(setItemAuth({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        console.log(error);
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data ? error.response.data : error.message,
          });
        }
        dispatch(setItemAuth({isLoading: false}));
        return false;
      });
  };
};
