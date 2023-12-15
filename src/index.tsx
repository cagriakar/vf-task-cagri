import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import App from "./App";
import api from "./apis/api";
import theme from "./theme";

const fetcher = async (arg: string | string[]): Promise<any> => {
    const url = Array.isArray(arg) ? arg[0] : arg;
    // to mimic the behavior of latency in requests
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await api.get(url);

    return res.data;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SWRConfig value={{ fetcher }}>
                    <App />
                </SWRConfig>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
