import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePicture } from "../apiCalls";

export const useUpdatePicture = pictureId => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: title => updatePicture(pictureId, title),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["pictures", pictureId]})
    })
}