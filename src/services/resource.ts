import { type AxiosResponse } from "axios";
import api from "../apis/api";
import { type CreateResourceFrom } from "../pages/ResourceCreate";

export async function addResource(resource: CreateResourceFrom) {
    const response = await api.post<CreateResourceFrom, AxiosResponse<{ id: string }>>("/resources", resource);

    return response.data;
}
