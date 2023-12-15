import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

interface BasicResource {
    id: string;
    name: string;
}

export default function useResourceList(config: SWRConfiguration = {}): SWRResponse<BasicResource[]> {
    return useSWR("/resources", { ...config });
}

export { type BasicResource };
