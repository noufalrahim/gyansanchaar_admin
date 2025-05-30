import { createData, authSignup } from "@/api/services/createData";
import { useMutation } from "@tanstack/react-query";
import { UserType } from "@/types";

export const useCreateData = <T>(url: string) => {
    return useMutation<T, Error, T>({
        mutationFn: (data) => createData<T>(url, data),
    });
};

export const useAuthSignup = () => {
    return useMutation<UserType, Error, UserType>({
        mutationFn: (data) => authSignup(data),
    });
};