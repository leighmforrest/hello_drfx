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


export const fetchPicture = async (pictureId) => {
  const { data } = await api.get(`${endpoints.pictureDetail}${pictureId}`);
  return data;
};


export const like = async (pictureId) => {
  const response = await api.post(`${endpoints.like}${pictureId}/like`);
  return response.data;
};

export const unlike = async (pictureId) => {
  const response = await api.delete(`${endpoints.like}${pictureId}/like`);
  return response.data;
};


export const updatePicture = async (pictureId, title) => {
  const response = await api.patch(`${pictureId}`, { title });
  return response.data;
}

export const deletePicture = async (pictureId) => {
  const response = await api.delete(`${pictureId}`);
  return response.data;
};