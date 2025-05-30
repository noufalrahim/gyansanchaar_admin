import apiClient from "../apiClient";

export const readData = async <T>(url: string): Promise<T> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Unauthorized");
    };

    try {
        const response = await apiClient.get<T>(url, {
            headers: {
                "x-auth-token": token,
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
};
