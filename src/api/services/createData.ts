import { UserType } from "@/types";
import apiClient from "../apiClient";

export const createData = async <T>(url: string, data: T): Promise<T> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const response = await apiClient.post<T>(url, data, {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`An error occurred while creating data: ${error}`);
    }
};

export const authSignup = async (data: UserType): Promise<UserType> => {
    
    try {
        const response = await apiClient.post<UserType>("/auth/signup", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`An error occurred while creating data: ${error}`);
    }
};