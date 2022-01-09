import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Chat } from "./pages/Chat";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
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
