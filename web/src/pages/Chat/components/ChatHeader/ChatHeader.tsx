import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { Share } from "@mui/icons-material";

export const ChatHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px 8px",
        borderBottom: 1,
        borderBottomColor: "divider",
        position: "sticky",
        top: 0,
        backgroundColor: "background.default",
        zIndex: 1,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          color="black.emphasisHight"
          sx={{ marginBottom: "1px" }}
        >
          Руководящий отдел
        </Typography>
        <Typography variant="body2" color="black.emphasisMedium">
          5 участников
        </Typography>
      </Box>
      <IconButton edge="end">
        <Share />
      </IconButton>
    </Box>
  );
};
