import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiError from "../components/ApiError";
import SelectableButton from "../components/SelectableButton";
import useResourceById, { type DetailedResource } from "../hooks/useResourceById";
import useSkillsResourceById from "../hooks/useSkillsResourceById";

enum Viewtype {
    "overview" = "Overview",
    "skills" = "Skills"
}

function ResourceHeader({ data, isLoading }: { data: DetailedResource; isLoading: boolean }) {
    if (isLoading)
        return (
            <>
                <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                <Skeleton variant="rounded" width={210} height="1rem" />
            </>
        );

    return (
        <>
            <Avatar sx={{ mr: 2 }} variant="circular">
                {data.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
            </Avatar>
            <Typography variant="h6" fontWeight={500}>
                {data.name}
            </Typography>
        </>
    );
}

function ResourceOverview({
    data,
    isLoading,
    isVisible
}: {
    data: DetailedResource;
    isLoading: boolean;
    isVisible: boolean;
}) {
    if (!isVisible) return null;

    if (isLoading)
        return (
            <Stack sx={{ ml: 7 }} gap={1.5}>
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={210} height="0.75rem" />
                    <Skeleton variant="rounded" width={210} height="1.2rem" />
                </Stack>
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={210} height="0.75rem" />
                    <Skeleton variant="rounded" width={210} height="1.2rem" />
                </Stack>
            </Stack>
        );

    return (
        <Stack sx={{ ml: 7 }} gap={1.5}>
            <Stack>
                <Typography
                    variant="subtitle2"
                    sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        fontWeight: 400
                    })}
                >
                    Role
                </Typography>
                <Typography
                    variant="body1"
                    sx={(theme) => ({
                        fontWeight: 500
                    })}
                >
                    Senior Developer
                </Typography>
            </Stack>
            <Stack>
                <Typography
                    variant="subtitle2"
                    sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        fontWeight: 400
                    })}
                >
                    Email
                </Typography>
                <Typography
                    variant="body1"
                    sx={(theme) => ({
                        fontWeight: 500
                    })}
                >
                    email@email.com
                </Typography>
            </Stack>
        </Stack>
    );
}

function ResourceSkills({ isVisible }: { isVisible: boolean }) {
    const { resourceId } = useParams();
    const { data, isLoading, error, mutate } = useSkillsResourceById(isVisible ? resourceId : undefined);

    if (!isVisible) return null;
    if (error) return <ApiError onRetry={mutate} />;
    if (isLoading)
        return (
            <Stack sx={{ ml: 7 }} gap={1.5}>
                <Skeleton variant="rounded" width={210} height="1rem" />
                <Skeleton variant="rounded" width={210} height="1rem" />
                <Skeleton variant="rounded" width={210} height="1rem" />
            </Stack>
        );

    return (
        <Stack sx={{ ml: 7 }}>
            <ul style={{ paddingLeft: 20 }}>
                {data?.map((skill) => (
                    <li key={skill.id}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {skill.name}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
export default function ResourceDetail() {
    const { resourceId } = useParams();
    const { data, isLoading, error, mutate } = useResourceById(resourceId);
    const [viewType, setViewType] = useState<Viewtype>(Viewtype.overview);

    useEffect(() => {
        resourceId && setViewType(Viewtype.overview);
    }, [resourceId]);

    return (
        <Box sx={{ display: "flex", p: 2.5 }}>
            <Stack gap={2.7}>
                <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                    {error ? <ApiError onRetry={mutate} /> : <ResourceHeader data={data!} isLoading={isLoading} />}
                </Stack>
                <Stack gap={2.7}>
                    <Stack direction="row" spacing={1} sx={{ ml: 7 }}>
                        <SelectableButton
                            isSelected={viewType === Viewtype.overview}
                            onClick={() => {
                                setViewType(Viewtype.overview);
                            }}
                            sx={{ minWidth: 100 }}
                        >
                            {Viewtype.overview}
                        </SelectableButton>
                        <SelectableButton
                            isSelected={viewType === Viewtype.skills}
                            onClick={() => {
                                setViewType(Viewtype.skills);
                            }}
                            sx={{ minWidth: 100 }}
                        >
                            {Viewtype.skills}
                        </SelectableButton>
                    </Stack>
                    {error ? (
                        <ApiError onRetry={mutate} />
                    ) : (
                        <ResourceOverview
                            data={data!}
                            isLoading={isLoading}
                            isVisible={viewType === Viewtype.overview}
                        />
                    )}
                </Stack>
                <ResourceSkills isVisible={viewType === Viewtype.skills} />
            </Stack>
        </Box>
    );
}
