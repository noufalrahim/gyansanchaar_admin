import { editData } from "@/api/services/updateData";
import { useMutation } from "@tanstack/react-query";

type WithId = { id: string };

export const useModifyData = <T extends WithId>(baseUrl: string) => {
  return useMutation<T, Error, T>({
    mutationFn: (data) => editData<T>(`${baseUrl}/${data.id}`, data),
  });
};
