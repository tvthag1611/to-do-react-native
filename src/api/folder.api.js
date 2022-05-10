import {request} from './request';

export const apiGetAllFolders = () => request('get', 'folder');
export const apiCreateFolder = (data) => request('post', 'folder/add', data);
export const apiEditFolder = (data) => request('put', 'folder/edit', data);
export const apiDeleteFolder = (config) =>
  request('delete', 'folder/delete', config);
export const apiGetNoteInFolder = (config) =>
  request('get', 'folder/note', config);
