import { Avatar, Drawer, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import ResourceListContainer from "../containers/ResourceListContainer";

const drawerWidth = 300;

export function useDebugEffect(componentName: string) {
    const isMountedRef = useRef(false);
    useEffect(() => {
        isMountedRef.current && console.debug(`${componentName} re-rendered`);
    });
    useEffect(() => {
        console.debug(`${componentName} is mounting`);
        isMountedRef.current = true;
        return () => {
            console.debug(`${componentName} is unmounting`);
            isMountedRef.current = false;
        };
    }, [componentName]);
}

function Title() {
    return (
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Avatar sx={(theme) => ({ bgcolor: theme.palette.primary.main, mr: 1 })} variant="rounded">
                VF
            </Avatar>
            <Typography variant="h6" fontWeight={500}>
                RESOURCING
            </Typography>
        </Stack>
    );
}

export default function AppLayout({ loading = false }: { loading?: boolean }) {
    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        p: 1.5,
                        pt: 2.5,
                        pb: 2
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <Title />

                <Divider sx={{ my: 0.75 }} />

                <ResourceListContainer componentloading={loading} />

                <Box sx={{ pl: 2, display: "flex" }}>
                    <Link to={"/resources/create"}>
                        <Button sx={{ minWidth: "50%" }} variant="contained">
                            + New Resource
                        </Button>
                    </Link>
                </Box>
            </Drawer>

            <Outlet />
        </Box>
    );
}
