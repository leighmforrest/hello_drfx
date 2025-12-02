import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchComments } from '../apiCalls';
import { COMMENTS_LIMIT } from '../../settings';

export const useInfiniteComments = (pictureId) =>
  useInfiniteQuery({
    queryKey: ['comments', pictureId],
    queryFn: ({ pageParam = 0 }) =>
      fetchComments(pictureId, pageParam, COMMENTS_LIMIT),
    // eslint-disable-next-line no-unused-vars
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next, window.location.origin);
      const offsetParam = url.searchParams.get('offset');
      return offsetParam ? parseInt(offsetParam, 10) : undefined;
    },
  });
