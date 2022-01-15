import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const SignUp = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: "400px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: "24px" }}>
        Регистрация
      </Typography>
      <TextField label="ФИО" fullWidth sx={{ marginBottom: "24px" }} />
      <TextField
        type="email"
        label="Email"
        fullWidth
        sx={{ marginBottom: "24px" }}
      />
      <TextField
        type="password"
        label="Пароль"
        fullWidth
        sx={{ marginBottom: "32px" }}
      />
      <Button
        color="primary"
        variant="contained"
        disableElevation
        fullWidth
        sx={{ marginBottom: "32px", height: "56px" }}
      >
        Регистрация
      </Button>
      <Button
        component={Link}
        to="../signin"
        color="inherit"
        sx={{ color: "black.inactive", height: "32px" }}
      >
        Вход
      </Button>
    </Paper>
  );
};
