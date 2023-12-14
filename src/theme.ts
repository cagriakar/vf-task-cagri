import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#743de5",
    },
  },
});

export default responsiveFontSizes(theme);
