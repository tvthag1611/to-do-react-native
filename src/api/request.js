import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../utils/config';

const axiosInstane = axios.create();

axiosInstane.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const tk = await AsyncStorage.getItem('token');

    config.headers = {
      Authorization: `Bearer ${tk}`,
    };
    return config;
  },
  async (error) => {
    // Do something before request is sent
    console.log('error: ', error.message);
    return Promise.reject(error);
  },
);

export const request = (method, url, data, config) => {
  const api = BASE_URL || '';
  url = api + url;
  if (method === 'get') {
    return axiosInstane.get(url, {
      ...data,
      ...config,
    });
  } else if (method === 'post') {
    return axiosInstane.post(url, data, config);
  } else if (method === 'put') {
    return axiosInstane.put(url, data, config);
  } else {
    return axiosInstane.delete(url, {
      ...data,
      ...config,
    });
  }
};
