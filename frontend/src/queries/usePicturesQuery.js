import { useQuery } from "@tanstack/react-query";

import { fetchPictures } from "../apiCalls";


export const usePicturesQuery = ({offset, limit}) => useQuery({
    queryKey: ["pictures", offset, limit],
    queryFn: async () => fetchPictures(offset, limit),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
})
