import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Auth } from "./pages/Auth";
import { Chat } from "./pages/Chat";
import { ChatForm } from "./pages/ChatForm";
import { ChatUsers } from "./pages/ChatUsers";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      light: "#93CAF5",
    },
    secondary: {
      main: "#FF782C",
    },
    black: {
      main: "#000",
      emphasisHigh: "rgba(0, 0, 0, 0.87)",
      emphasisMedium: "rgba(0, 0, 0, 0.6)",
      inactive: "rgba(0, 0, 0, 0.54)",
    },
    background: {
      default: "#FBFCFD",
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
      letterSpacing: "0.15px",
    },
    h4: {
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "0.15px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "20px",
      lineHeight: "20px",
      letterSpacing: "0.15px",
    },
    overline: {
      fontSize: "18px",
      lineHeight: "21px",
      letterSpacing: "0.4px",
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow:
            "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)",

          "&.MuiButton-disableElevation": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          background: "#FFFFFF",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
          borderRadius: "4px",
        },
        elevation2: {
          background: "#FFFFFF",
          boxShadow:
            "0px -0.5px 2px 1px rgba(0, 0, 0, 0.02), 0px 1px 0px rgba(0, 0, 0, 0.02), 0px 2px 4px rgba(0, 0, 0, 0.06)",
          borderRadius: "6px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          "&.MuiPaper-root": {
            background: "#FFFFFF",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "4px",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          "&.MuiPaper-root": {
            background: " #FFFFFF",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "560px",
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "21px",
          letterSpacing: "0.4px",
          padding: "24px",
          paddingBottom: "16px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "24px",
          paddingTop: "16px",

          "& > :not(:first-of-type)": {
            marginLeft: "14px",
          },
        },
      },
    },
  },
});

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="auth/*" element={<Auth />} />
          <Route path="chats/new" element={<ChatForm />} />
          <Route path="chats/:id/users" element={<ChatUsers />} />
          <Route path="chats/:id" element={<Chat />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
