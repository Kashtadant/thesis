import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IChatVoteProps {
  status: "new" | "finished" | "result";
}

export const ChatVote: React.FC<IChatVoteProps> = ({ status }) => {
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
        variant="caption"
        color="black.main"
        sx={{ marginBottom: "13px" }}
      >
        Предложение: Декларация по НДС сменить процент с 12% до 15%. Стр. 134.
      </Typography>
      {status === "new" && (
        <Box sx={{ display: "grid", gap: "14px", gridAutoFlow: "column" }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              color: "#515151",
              borderColor: "#D7D7D7",
            }}
          >
            Отказать
          </Button>
          <Button variant="contained" color="primary">
            Принять
          </Button>
        </Box>
      )}
      {status === "finished" && (
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
      {status === "result" && (
        <Box sx={{ display: "flex", gap: "14px" }}>
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
