import Box from "@mui/material/Box";

export const ChatMessages: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FBFCFD",
        padding: "16px",
        flexGrow: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {children}
      </Box>
    </Box>
  );
};
