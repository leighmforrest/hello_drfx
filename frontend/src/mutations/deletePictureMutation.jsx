import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePicture } from "../apiCalls";

export const useDeletePicture = pictureId => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deletePicture(pictureId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["pictures"]})
    })
}