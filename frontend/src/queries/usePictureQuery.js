import { useQuery } from '@tanstack/react-query';

import { fetchPicture } from '../apiCalls';

export const usePictureQuery = (pictureId) =>
  useQuery({
    queryKey: ['pictures', pictureId],
    queryFn: async () => fetchPicture(pictureId),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false;
      if (error?.response?.status >= 500) return false;
      return failureCount < 3;
    },
    enabled: !!pictureId, // only run if pictureId is truthy
  });
