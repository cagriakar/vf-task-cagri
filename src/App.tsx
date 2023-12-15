import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";

const AppLayout = lazy(async () => await import("./layouts/AppLayout"));
const Home = lazy(async () => await import("./pages/Home"));
const ResourceCreate = lazy(async () => await import("./pages/ResourceCreate"));
const ResourceDetail = lazy(async () => await import("./pages/ResourceDetail"));

function LoadingContent() {
    return (
        <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <CircularProgress sx={{ mt: "25%" }} />
        </Box>
    );
}

// const Loadable = (Component: React.Element) =>
//     // eslint-disable-next-line func-names
//     function (props: any) {
//         return (
//             <Suspense fallback={<LoadingScreen />}>
//                 <Component {...props} />
//             </Suspense>
//         );
//     };

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<AppLayout loading />}>
                        <AppLayout />
                    </Suspense>
                }
            >
                <Route
                    index
                    element={
                        <Suspense fallback={<LoadingContent />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="resources"
                    element={
                        <Suspense fallback={<LoadingContent />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="resources/:resourceId"
                    element={
                        <Suspense fallback={<LoadingContent />}>
                            <ResourceDetail />
                        </Suspense>
                    }
                />
                <Route
                    path="resources/create"
                    element={
                        <Suspense fallback={<LoadingContent />}>
                            <ResourceCreate />
                        </Suspense>
                    }
                />

                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

function NoMatch() {
    return (
        <Box sx={{ display: "flex", flex: 1, justifyContent: "center", mt: 5 }}>
            <div>
                <h2>Nothing to see here!</h2>
                <p>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        </Box>
    );
}
