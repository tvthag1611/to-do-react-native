import {request} from './request';

export const apiGetAllNotes = () => request('get', 'note');
export const apiFilterNotes = (config) => request('get', 'note', config);
export const apiCreateNote = (data) => request('post', 'note/add', data);
export const apiEditNote = (data) => request('put', 'note/edit', data);
export const apiDeleteNote = (config) =>
  request('delete', 'note/delete', config);
