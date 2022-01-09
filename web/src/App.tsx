import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Chat } from "./pages/Chat";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      light: "#93CAF5",
    },
    black: {
      main: "#000",
      emphasisHigh: "rgba(0, 0, 0, 0.87)",
      emphasisMedium: "rgba(0, 0, 0, 0.6)",
      inactive: "rgba(0, 0, 0, 0.54)",
    },
    divider: "#E5E5E5",
  },
  typography: {
    caption: {
      fontSize: "12px",
      lineHeight: "15px",
      letterSpacing: "0.4px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.15px",
    },
    body2: {
      fontSize: "14px",
      lineHeight: "21px",
      letterSpacing: "0.25px",
    },
    subtitle1: {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontSize: "14px",
      lineHeight: "21px",
      letterSpacing: "0.1px",
    },
    h6: {
      fontSize: "20px",
      lineHeight: "20px",
      letterSpacing: "0.15px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow:
            "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)",
        },
      },
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chat />
    </ThemeProvider>
  );
};
