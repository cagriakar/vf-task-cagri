import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

interface Skill {
    id: number;
    name: string;
}

export default function useSkills(config: SWRConfiguration = {}): SWRResponse<Skill[]> {
    return useSWR("/skills", { ...config });
}

export { type Skill };
