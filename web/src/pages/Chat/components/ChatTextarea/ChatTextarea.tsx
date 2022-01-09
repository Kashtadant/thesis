import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
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

  "&::placeholder": {
    color: theme.palette.black.inactive,
  },
}));

export const ChatTextarea = () => {
  return (
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
      <IconButton edge="end">
        <IconVote sx={{ color: "#757575" }} />
      </IconButton>
    </Box>
  );
};
