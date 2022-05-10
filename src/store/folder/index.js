import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {
  apiCreateFolder,
  apiDeleteFolder,
  apiEditFolder,
  apiGetAllFolders,
  apiGetNoteInFolder,
} from '../../api/folder.api';

const initialState = {
  isLoading: false,
  noteInFolder: [],
  folders: [],
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setItemFolders: (state, action) => {
      Object.assign(state, action.payload);
    },
    addFolder: (state, action) => {
      state.folders.unshift(action.payload);
    },
    editFolder: (state, action) => {
      const index = state.folders.findIndex(
        (fol) => fol.id === action.payload.id,
      );

      state.folders[index] = action.payload;
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter((fol) => fol.id !== action.payload);
    },
  },
});

export const {
  setItemFolders,
  addFolder,
  editFolder,
  deleteNote,
  deleteFolder,
} = foldersSlice.actions;

export default foldersSlice.reducer;

export const getAllFolderAsync = () => {
  return async (dispatch) => {
    dispatch(setItemFolders({isLoading: true}));

    return await apiGetAllFolders()
      .then(
        (response) => {
          dispatch(
            setItemFolders({folders: [...response.data, {plusFolder: true}]}),
          );
          dispatch(setItemFolders({isLoading: false}));
          return true;
        },
        (error) => {
          dispatch(setItemFolders({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        dispatch(setItemFolders({isLoading: false}));
        return false;
      });
  };
};

export const getAllNoteInFolderAsync = (id) => {
  return async (dispatch) => {
    dispatch(setItemFolders({isLoading: true}));

    const config = {
      params: {
        id: id,
      },
    };

    return await apiGetNoteInFolder(config)
      .then(
        (response) => {
          console.log(response.data);
          dispatch(setItemFolders({noteInFolder: response.data}));
          dispatch(setItemFolders({isLoading: false}));
          return true;
        },
        (error) => {
          console.log(error);
          dispatch(setItemFolders({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        console.log(error);
        dispatch(setItemFolders({isLoading: false}));
        return false;
      });
  };
};

export const createFolderAsync = (data) => {
  return async (dispatch) => {
    return await apiCreateFolder(data)
      .then(
        (response) => {
          dispatch(addFolder(data));
          Toast.show({
            type: 'success',
            text1: 'Create folder successfully!',
          });
          return true;
        },
        (error) => {
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data,
            });
          }
          return false;
        },
      )
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data,
          });
        }
        return false;
      });
  };
};

export const editFolderAsync = (data) => {
  return async (dispatch) => {
    return await apiEditFolder(data)
      .then(
        (response) => {
          dispatch(editFolder(data));
          Toast.show({
            type: 'success',
            text1: 'Edit folder successfully!',
          });
          return true;
        },
        (error) => {
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data,
            });
          }
          return false;
        },
      )
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data,
          });
        }
        return false;
      });
  };
};

export const deleteFolderAsync = (id) => {
  return async (dispatch) => {
    const config = {
      params: {
        id,
      },
    };

    return await apiDeleteFolder(config)
      .then(
        (response) => {
          dispatch(deleteFolder(id));
          Toast.show({
            type: 'success',
            text1: 'Delete folder successfully!',
          });
          return true;
        },
        (error) => {
          if (error.response) {
            Toast.show({
              type: 'error',
              text1: error.response.data,
            });
          }
          return false;
        },
      )
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data,
          });
        }
        return false;
      });
  };
};
