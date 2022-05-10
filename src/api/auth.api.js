import {request} from './request';

export const apiLogin = (data, config) =>
  request('post', 'login', data, config);

export const apiRegister = (data) => request('post', 'register', data);
export const apiVerifyOtp = (data, config) =>
  request('put', 'register/confirm', data, config);
