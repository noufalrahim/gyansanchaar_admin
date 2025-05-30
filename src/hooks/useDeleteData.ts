import { deleteData } from "@/api/services/deleteData";
import { useMutation } from "@tanstack/react-query";

export const useDeleteData = (url: string) => {
    return useMutation<void, Error, void>({
        mutationFn: () => deleteData(url),
    });
};