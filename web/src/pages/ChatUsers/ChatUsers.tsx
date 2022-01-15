import { Link, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { UsersSelection } from "../../modules/ui/UsersSelection";

export const ChatUsers = () => {
  const { id } = useParams<{ id: string }>();

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
          sx={{ marginBottom: "16px" }}
        >
          Добавление пользователей
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
            component={Link}
            to={`/chats/${id}`}
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
            Сохранить
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
