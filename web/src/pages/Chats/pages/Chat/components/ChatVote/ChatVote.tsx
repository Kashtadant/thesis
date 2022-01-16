import { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  IPollMessage,
  IMessage,
  accept,
  decline,
} from "../../../../../../modules/features/messages";
import { IUser } from "../../../../../../modules/features/users";

interface IChatVoteProps {
  user: IUser;
  message: IPollMessage;
  onVote?: (message: IMessage) => void;
}

export const ChatVote: React.FC<IChatVoteProps> = ({
  message,
  user,
  onVote,
}) => {
  const [isSending, setSending] = useState(false);

  const votes: {
    accepted: number[];
    declined: number[];
  } = JSON.parse(message.votes as unknown as string);
  const participants: number[] = JSON.parse(
    message.participants as unknown as string
  );

  const onVoteClick = (isAccept: boolean) => () => {
    setSending(true);

    (isAccept ? accept(message.id) : decline(message.id))
      .then((data) => {
        if (onVote) {
          onVote(data);
        }
      })
      .catch(() => {
        setSending(false);
      });
  };

  return (
    <Box
      sx={{
        marginTop: "8px",
        padding: "14px 12px 16px",
        backgroundColor: "Background.default",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        width: "100%",
        maxWidth: "490px",
      }}
    >
      <Typography component="div" variant="caption" color="black.main">
        {message.text}
      </Typography>
      {message.result === null &&
        participants.includes(user.id) &&
        !(
          votes.accepted.includes(user.id) || votes.declined.includes(user.id)
        ) && (
          <Box
            sx={{
              display: "grid",
              gap: "14px",
              gridAutoFlow: "column",
              marginTop: "13px",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                color: "#515151",
                borderColor: "#D7D7D7",
              }}
              disabled={isSending}
              onClick={onVoteClick(false)}
            >
              Отказать
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isSending}
              onClick={onVoteClick(true)}
            >
              Принять
            </Button>
          </Box>
        )}
      {false && (
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled
            fullWidth
            sx={{
              "&.Mui-disabled": {
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              },
            }}
          >
            Было принято
          </Button>
        </Box>
      )}
      {message.result !== null && (
        <Box sx={{ display: "flex", gap: "14px", marginTop: "13px" }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ color: "#515151", borderColor: "#D7D7D7" }}
          >
            Скрыть
          </Button>
          <Button variant="contained" color="primary">
            Скачать
          </Button>
        </Box>
      )}
    </Box>
  );
};
