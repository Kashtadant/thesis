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
      {message.result === null && (
        <Typography
          component="div"
          variant="overline"
          sx={{ color: "#0C0C0C", marginBottom: "13px" }}
        >
          На утверждении
        </Typography>
      )}
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
      {message.result !== null && (
        <Box sx={{ marginTop: "13px" }}>
          <Button
            variant="contained"
            color={message.result ? "primary" : "error"}
            disabled
            fullWidth
            sx={{
              "&.Mui-disabled": {
                backgroundColor: message.result ? "primary.light" : "#f8c4c4",
                color: "primary.contrastText",
              },
            }}
          >
            {message.result ? "Было принято" : "Было отклонено"}
          </Button>
        </Box>
      )}
    </Box>
  );
};
