import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#743de5"
        }
    },
    components: {
        MuiButton: { styleOverrides: { root: { textTransform: "none" } } }
    }
});

export default responsiveFontSizes(theme);
