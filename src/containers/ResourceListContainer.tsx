import { ListItemButton, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SelectableButton from "../components/SelectableButton";
import useResourceList from "../hooks/useResourceList";

export default function ResourceList({ componentloading = true }: { componentloading?: boolean }) {
    const { resourceId } = useParams();
    const { data, isLoading } = useResourceList();
    const [isAscending, setIsAscending] = useState(true);
    const sortedData = useMemo(
        () => data?.sort((a, b) => (isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))),
        [data, isAscending]
    );

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    my: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    mx: 1
                }}
            >
                <Typography variant="button" style={{ textTransform: "none" }}>
                    Sort
                </Typography>
                <Stack direction="row" spacing={1}>
                    <SelectableButton
                        isSelected={isAscending}
                        onClick={() => {
                            setIsAscending(true);
                        }}
                    >
                        A-Z
                    </SelectableButton>
                    <SelectableButton
                        isSelected={!isAscending}
                        onClick={() => {
                            setIsAscending(false);
                        }}
                    >
                        Z-A
                    </SelectableButton>
                </Stack>
            </Box>
            <Divider sx={{ my: 0.75 }} />

            <List sx={{ height: "100%", overflowY: "scroll" }}>
                {componentloading || isLoading ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton dense sx={{ borderRadius: 2 }}>
                                <Skeleton sx={{ width: "100%" }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton dense sx={{ borderRadius: 2 }}>
                                <Skeleton sx={{ width: "100%" }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton dense sx={{ borderRadius: 2 }}>
                                <Skeleton sx={{ width: "100%" }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton dense sx={{ borderRadius: 2 }}>
                                <Skeleton sx={{ width: "100%" }} />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    (sortedData ?? []).map(({ id, name }) => (
                        <Link key={id} to={`/resources/${id}`} style={{ textDecoration: "none", color: "black" }}>
                            <ListItem disablePadding>
                                <ListItemButton dense selected={resourceId === id.toString()} sx={{ borderRadius: 2 }}>
                                    <ListItemText primary={name} primaryTypographyProps={{ fontWeight: 500 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))
                )}
            </List>
        </>
    );
}
