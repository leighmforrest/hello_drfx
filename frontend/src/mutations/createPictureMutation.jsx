import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPicture } from '../apiCalls';

const createPictureMutation = async ({ title, picture }) => {
  const formData = new FormData();

  formData.append('picture', picture);
  formData.append('title', title);

  const response = await createPicture(formData);

  return response;
};

export const useCreatePictureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPictureMutation,
    onSuccess: () => queryClient.invalidateQueries(['pictures']),
  });
};
