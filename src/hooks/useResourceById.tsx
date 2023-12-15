import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
interface DetailedResource {
    id: string;
    name: string;
    role: string;
    email: string;
}

export default function useResourceById(
    id: string | undefined,
    config: SWRConfiguration = {}
): SWRResponse<DetailedResource> {
    return useSWR(id ? `/resources/${id}` : null, { ...config });
}

export { type DetailedResource };
