import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPicture } from '../apiCalls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const createPictureMutation = async ({ title, picture, onProgress }) => {
  const formData = new FormData();

  formData.append('picture', picture);
  formData.append('title', title);

  return createPicture(formData, onProgress)
};

export const useCreatePictureMutation = (setUploadProgress) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({title, picture }) =>
      createPictureMutation({title, picture, onProgress: setUploadProgress}),
    onSuccess: () => {
      queryClient.invalidateQueries(['pictures']);
      setUploadProgress(0);
      toast("Image was uploaded.")
      navigate("/")
    },
  });
};
