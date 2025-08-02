import { endpoints, LIMIT } from '../settings';
import api from './apiClient';

export const fetchPictures = async (offset= 0, limit=LIMIT) => {
  const { data } = await api.get(`/?offset=${offset}&limit=${limit}`);
  return data;
};

export const createPicture = async (formData, onProgress) => {
  const {data} = await api.post(endpoints.pictureCreate, formData, {
    onUploadProgress: (evt) => {
      if (!evt.total) return;
      const percent = Math.round(
        (evt.loaded * 100) / evt.total
      );
      onProgress?.(percent);
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data
};
