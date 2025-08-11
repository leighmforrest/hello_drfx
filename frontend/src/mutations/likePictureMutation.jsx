import { useMutation, useQueryClient } from '@tanstack/react-query';
import { like, unlike } from '../apiCalls';

export function useLikePicture(pictureId) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => like(pictureId),
    onSuccess: () => {
      queryClient.invalidateQueries(['pictures']);
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlike(pictureId),
    onSuccess: () => {
      queryClient.invalidateQueries(['pictures']);
    }
  });

  return { likeMutation, unlikeMutation };
}
