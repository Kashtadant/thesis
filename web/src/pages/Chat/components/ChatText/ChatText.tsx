import Typography from "@mui/material/Typography";

export const ChatText: React.FC = ({ children }) => {
  return (
    <Typography
      component="div"
      variant="caption"
      color="black.main"
      sx={{ marginTop: "6px" }}
    >
      {children}
    </Typography>
  );
};
