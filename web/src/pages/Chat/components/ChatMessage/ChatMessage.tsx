import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Photo0 from "../../../../modules/features/users/0.jpg";

export const ChatMessage: React.FC = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar src={Photo0} sx={{ marginRight: "16px" }} />
      <Box>
        <Typography
          variant="subtitle2"
          color="primary.main"
          sx={{ marginBottom: "6px" }}
        >
          Владимир Быков
        </Typography>
        {children}
      </Box>
    </Box>
  );
};
