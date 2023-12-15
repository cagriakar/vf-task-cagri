import { Checkbox, FormControlLabel, FormGroup, FormHelperText, InputLabel, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import useSkills from "../hooks/useSkills";
import { type CreateResourceFrom } from "../pages/ResourceCreate";
import ApiError from "./ApiError";

export default function SkillsSelect({
    errorText,
    value,
    onChange
}: {
    errorText: string;
    value: CreateResourceFrom["skills"];
    onChange: (...event: any[]) => void;
}) {
    const { data, isLoading, error, mutate } = useSkills();

    if (error) return <ApiError onRetry={mutate} />;

    if (isLoading)
        return (
            <Stack spacing={1}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </Stack>
        );

    return (
        <Stack>
            <InputLabel shrink sx={{ fontWeight: 600 }}>
                Skills
            </InputLabel>
            <FormGroup>
                {data?.map((skill) => (
                    <FormControlLabel
                        key={skill.id}
                        control={
                            <Checkbox
                                size="small"
                                checked={value.includes(skill.id)}
                                onChange={({ target: { checked } }) => {
                                    onChange(
                                        checked ? [...value, skill.id] : value.filter((skillId) => skillId !== skill.id)
                                    );
                                }}
                            />
                        }
                        label={skill.name}
                    />
                ))}
            </FormGroup>
            {errorText && (
                <FormHelperText error sx={{ ml: 2 }}>
                    {errorText}
                </FormHelperText>
            )}
        </Stack>
    );
}
