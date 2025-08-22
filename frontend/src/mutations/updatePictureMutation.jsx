import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePicture } from "../apiCalls";

export const useUpdatePicture = (pictureId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updatePicture(pictureId, data), 
    onSuccess: () => {
      // refresh the list of pictures
      queryClient.invalidateQueries({ queryKey: ["pictures"] });
      // refresh the detail view for this picture
      queryClient.invalidateQueries({ queryKey: ["picture", pictureId] });
    },
  });
};
