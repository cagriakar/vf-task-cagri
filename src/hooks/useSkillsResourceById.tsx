import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import { type Skill } from "./useSkills";

export default function useSkillsResourceById(
    id: string | undefined,
    config: SWRConfiguration = {}
): SWRResponse<Skill[]> {
    return useSWR(id ? `/resources/${id}/skills` : null, { ...config });
}
