import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import noteReducer from './notes';
import folderReducer from './folder';

export const store = configureStore({
  reducer: {
    authReducer,
    noteReducer,
    folderReducer,
  },
});
