import { useQuery } from "@tanstack/react-query";

import { fetchPicture } from "../apiCalls";


export const usePictureQuery = (pictureId) => useQuery({
    queryKey: ["pictures", pictureId],
    queryFn: async () => fetchPicture(pictureId),
})