import React, { useState } from "react";

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

import { IRoom } from "../../../../../../modules/features/rooms";
import {
  createMessage,
  createPoll,
  IMessage,
} from "../../../../../../modules/features/messages";
import { IUser } from "../../../../../../modules/features/users";

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

interface IChatTextareaProps {
  user: IUser;
  room: IRoom;
  onCreateMessage?: (message: IMessage) => void;
}

export const ChatTextarea = ({
  room,
  user,
  onCreateMessage,
}: IChatTextareaProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("");
  const [participants, setParticipants] = useState<number[]>([]);
  const [isSending, setSending] = useState(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSending) {
      setDialogOpen(false);
    }
  };

  const onMessageSubmit = () => {
    if (text.trim()) {
      setSending(true);

      createMessage(room.id, text.trim())
        .then((message) => {
          if (onCreateMessage) {
            onCreateMessage(message);
          }
          setText("");
        })
        .finally(() => {
          setSending(false);
        });
    }
  };

  const onPollSubmit = () => {
    if (text.trim() && participants.length > 1) {
      setSending(true);

      createPoll(room.id, text.trim(), participants)
        .then((message) => {
          if (onCreateMessage) {
            onCreateMessage(message);
          }
          setText("");
          setParticipants([]);
          onDialogClose();
        })
        .finally(() => {
          setSending(false);
        });
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onMessageSubmit();
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onCheckboxChange =
    (id: number) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const newValue = participants.filter((v) => v !== id);
      if (checked) {
        newValue.push(id);
      }
      setParticipants(newValue);
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
        <Textarea
          placeholder="Написать сообщение ..."
          value={text}
          disabled={isSending}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
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
            value={text}
            disabled={isSending}
            onChange={onChange}
          />
          <Typography
            component="div"
            variant="overline"
            sx={{ marginBottom: "8px" }}
          >
            Согласовать с ...
          </Typography>

          <Box>
            {room.members.map((user) => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    color="secondary"
                    checked={participants.includes(user.id)}
                    onChange={onCheckboxChange(user.id)}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    color="black.main"
                    sx={{ lineHeight: "16px" }}
                  >
                    {user.full_name}
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
            disabled={isSending}
          >
            Отмена
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ height: "36px" }}
            disabled={isSending || !text.trim() || participants.length < 2}
            onClick={onPollSubmit}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
