import React, { useState, useRef } from "react";

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
import InputAdornment from "@mui/material/InputAdornment";

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
  const [textPoll, setTextPoll] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [participants, setParticipants] = useState<number[]>([]);
  const [isSending, setSending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    if (textPoll.trim() && file) {
      setSending(true);

      createPoll(room.id, textPoll.trim(), participants, file)
        .then((message) => {
          if (onCreateMessage) {
            onCreateMessage(message);
          }
          setTextPoll("");
          setParticipants([]);
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
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

  const onChangePoll = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextPoll(event.target.value);
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

  const onFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
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
            value={textPoll}
            disabled={isSending}
            onChange={onChangePoll}
          />
          <TextField
            placeholder="Выберите файл"
            fullWidth
            helperText="Допустимые форматы: .docx, .doс, .pdf"
            sx={{ marginBottom: "16px" }}
            value={file?.name || ""}
            onClick={onFileClick}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="inherit"
                    disableElevation
                    sx={{
                      height: "56px",
                      padding: "0 16px",
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                      color: "rgba(0, 0, 0, 0.6)",
                      borderRadius: 0,
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                      right: "-14px",
                    }}
                  >
                    Выбрать
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx, .doс, .pdf"
            style={{ opacity: 0, width: 0, height: 0 }}
            onChange={onFileChange}
          />
          <Typography
            component="div"
            variant="overline"
            sx={{ marginBottom: "8px" }}
          >
            Согласовать с ...
          </Typography>

          <Box>
            {room.members
              .filter((u) => u.id !== user.id)
              .map((user) => (
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
            disabled={
              isSending || !textPoll.trim() || !participants.length || !file
            }
            onClick={onPollSubmit}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
