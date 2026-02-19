import { apiClient } from "@/api/axios";
import { Location } from "./type";

export const getLocations = async (): Promise<Location[]> => {
    const response = await apiClient.get<Location[]>("/meta/locations");
    return response.data;
};
