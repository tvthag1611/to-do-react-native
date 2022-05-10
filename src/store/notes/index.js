import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {
  apiCreateNote,
  apiDeleteNote,
  apiEditNote,
  apiFilterNotes,
  apiGetAllNotes,
} from '../../api/note.api';

const initialState = {
  isLoading: false,
  notes: [],
  searchedNotes: [],
  noteItem: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setItemNotes: (state, action) => {
      Object.assign(state, action.payload);
    },
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
      state.searchedNotes.unshift(action.payload);
    },
    editNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id,
      );

      state.notes[index] = action.payload;
      state.searchedNotes[index] = action.payload;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.searchedNotes = state.notes.filter(
        (note) => note.id !== action.payload,
      );
    },
    searchNotes: (state, action) => {
      state.searchedNotes = action.payload;
    },
  },
});

export const {
  setItemNotes,
  addNote,
  editNote,
  deleteNote,
  searchNotes,
} = notesSlice.actions;

export default notesSlice.reducer;

export const getAllNotesAsync = () => {
  return async (dispatch) => {
    dispatch(setItemNotes({isLoading: true}));

    return await apiGetAllNotes()
      .then(
        (response) => {
          dispatch(setItemNotes({notes: response.data}));
          dispatch(setItemNotes({searchedNotes: response.data}));
          dispatch(setItemNotes({isLoading: false}));
          return true;
        },
        (error) => {
          dispatch(setItemNotes({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        dispatch(setItemNotes({isLoading: false}));
        return false;
      });
  };
};

export const searchAllNotesAsync = (title) => {
  return async (dispatch) => {
    dispatch(setItemNotes({isLoading: true}));

    const config = {
      params: {
        title,
      },
    };

    return await apiFilterNotes(config)
      .then(
        (response) => {
          console.log(response.data);
          dispatch(searchNotes(response.data));
          dispatch(setItemNotes({isLoading: false}));
          return true;
        },
        (error) => {
          dispatch(setItemNotes({isLoading: false}));
          return false;
        },
      )
      .catch((error) => {
        dispatch(setItemNotes({isLoading: false}));
        return false;
      });
  };
};

export const createNoteAsync = (data) => {
  return async (dispatch) => {
    return await apiCreateNote(data)
      .then(
        (response) => {
          dispatch(addNote(data));
          Toast.show({
            type: 'success',
            text1: 'Create note successfully!',
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

export const editNoteAsync = (data) => {
  return async (dispatch) => {
    return await apiEditNote(data)
      .then(
        (response) => {
          dispatch(editNote(data));
          Toast.show({
            type: 'success',
            text1: 'Edit note successfully!',
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

export const deleteNoteAsync = (id) => {
  return async (dispatch) => {
    const config = {
      params: {
        id: id,
      },
    };

    console.log(config);

    return await apiDeleteNote(config)
      .then(
        (response) => {
          dispatch(deleteNote(id));
          Toast.show({
            type: 'success',
            text1: 'Delete note successfully!',
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
