import { endpoints } from '../settings';
import api from './apiClient';

export const fetchPictures = async () => {
  const { data } = await api.get('/');
  return data;
};

export const createPicture = async (formData) => {
  console.log(formData);
  await api.post(endpoints.pictureCreate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
