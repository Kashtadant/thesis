import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { UsersSelection } from "../../modules/ui/UsersSelection";

export const ChatForm = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          maxWidth: "560px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="div"
          variant="overline"
          sx={{ marginBottom: "24px" }}
        >
          Новый чат
        </Typography>

        <TextField
          label="Название чата"
          fullWidth
          sx={{ marginBottom: "16px" }}
        />

        <Typography
          component="div"
          variant="overline"
          sx={{ marginBottom: "16px" }}
        >
          Добавить сотрудников
        </Typography>

        <UsersSelection />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              color: "#515151",
              borderColor: "#D7D7D7",
              marginRight: "14px",
              height: "36px",
            }}
          >
            Отмена
          </Button>
          <Button color="primary" variant="contained" sx={{ height: "36px" }}>
            Создать
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
