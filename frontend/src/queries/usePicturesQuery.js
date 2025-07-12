import { useQuery } from "@tanstack/react-query";

import { fetchPictures } from "../apiCalls";


export const usePicturesQuery = () => useQuery({
    queryKey: ["pictures"],
    queryFn: async () => fetchPictures(),
    staleTime: 1000 * 60 * 5,
})
