import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { styled } from "@mui/material/styles";

import { IconFile } from "./IconFile";
import { IconVote } from "./IconVote";

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  border: 0,
  outline: "none",
  flexGrow: 1,
  fontSize: "14px",
  lineHeight: "15px",
  letterSpacing: "0.4px",
  resize: "none",
  zIndex: 1,
  background: "transparent",

  "&::placeholder": {
    color: theme.palette.black.inactive,
  },
}));

const USERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ChatTextarea = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "12px 16px",
          position: "sticky",
          bottom: 0,
          borderTop: 1,
          borderTopColor: "divider",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton edge="start">
          <IconFile sx={{ color: "#757575" }} />
        </IconButton>
        <Textarea placeholder="Написать сообщение ..." />
        <IconButton edge="end" onClick={onDialogOpen}>
          <IconVote sx={{ color: "#757575" }} />
        </IconButton>
      </Box>
      <Dialog open={isDialogOpen} onClose={onDialogClose} scroll="body">
        <DialogTitle>Предолжение</DialogTitle>
        <Box sx={{ padding: "0 24px" }}>
          <TextField
            label="Текст предложения"
            multiline
            minRows={2}
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <Typography
            component="div"
            variant="overline"
            sx={{ marginBottom: "8px" }}
          >
            Согласовать с ...
          </Typography>

          <Box>
            {USERS.map((user) => (
              <FormControlLabel
                key={user}
                control={<Checkbox color="secondary" />}
                label={
                  <Typography
                    variant="body1"
                    color="black.main"
                    sx={{ lineHeight: "16px" }}
                  >
                    Дорофеева Клавдия Олеговна
                  </Typography>
                }
                sx={{
                  width: "100%",
                  "&:not(:last-child)": {
                    marginBottom: "-8px",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              color: "#515151",
              borderColor: "#D7D7D7",
              height: "36px",
            }}
            onClick={onDialogClose}
          >
            Отмена
          </Button>
          <Button color="primary" variant="contained" sx={{ height: "36px" }}>
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
