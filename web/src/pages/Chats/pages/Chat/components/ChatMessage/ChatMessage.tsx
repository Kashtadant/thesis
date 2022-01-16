import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { IMessage } from "../../../../../../modules/features/messages";
import { IUser } from "../../../../../../modules/features/users";

interface IChatMessageProps {
  message: IMessage;
  user: IUser;
}

export const ChatMessage: React.FC<IChatMessageProps> = ({
  children,
  message,
  user,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar src={user.avatar} sx={{ marginRight: "16px" }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle2"
          color="primary.main"
          sx={{ marginBottom: "6px" }}
        >
          {user.full_name}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};
