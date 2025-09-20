import { useMutation, useQueryClient } from '@tanstack/react-query';
import { like, unlike } from '../apiCalls';

export function useLikePicture(pictureId) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => like(pictureId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pictures'] });
      queryClient.invalidateQueries({ queryKey: ['picture', pictureId] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlike(pictureId),
    onSuccess: () => {
      queryClient.invalidateQueries(['pictures']);
      queryClient.invalidateQueries({ queryKey: ['picture', pictureId] });
    },
  });

  return { likeMutation, unlikeMutation };
}
