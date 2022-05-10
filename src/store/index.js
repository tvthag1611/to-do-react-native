import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from './auth';
import noteReducer from './notes';
import folderReducer from './folder';

const middlewares = getDefaultMiddleware({
  immutableCheck: false,
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    authReducer,
    noteReducer,
    folderReducer,
  },
  middleware: middlewares,
});
