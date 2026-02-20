import { apiClient } from "@/api/axios";
import { Property } from "./types";

export interface PropertyFilters {
    location_id?: string;
    property_type?: string;
    county?: string;
    city?: string;
    search?: string;
}

export const getProperties = async (
    filters?: PropertyFilters
): Promise<Property[]> => {
    const response = await apiClient.get<Property[]>("/properties", {
        params: filters,
    });
    return response.data;
};

export const getPropertyById = async (id: string) => {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
};

export const createProperty = async (data: any) => {
    const response = await apiClient.post("/properties", data);
    return response.data;
};

export const getMyProperties = async () => {
    const response = await apiClient.get("/properties/me");
    return response.data;
};
export const updateProperty = async (id: string, data: any) => {
    const response = await apiClient.put(`/properties/${id}`, data);
    return response.data;
};
