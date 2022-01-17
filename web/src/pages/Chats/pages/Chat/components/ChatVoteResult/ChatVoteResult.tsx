import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { IDownloadMessage } from "../../../../../../modules/features/messages";

interface IChatVoteResultProps {
  message?: IDownloadMessage;
}

export const ChatVoteResult: React.FC<IChatVoteResultProps> = ({ message }) => {
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
      <Typography
        component="div"
        variant="overline"
        sx={{ color: "#0C0C0C", marginBottom: "13px" }}
      >
        Изменение утверждено
      </Typography>
      <Typography component="div" variant="caption" color="black.main">
        Тексттекст
      </Typography>

      <Box sx={{ display: "flex", gap: "14px", marginTop: "13px" }}>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "#515151", borderColor: "#D7D7D7" }}
        >
          Скрыть
        </Button>
        <Button variant="contained" color="success">
          Скачать
        </Button>
      </Box>
    </Box>
  );
};
