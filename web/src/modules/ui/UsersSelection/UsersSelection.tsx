import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

const USERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const UsersSelection = () => {
  return (
    <Box>
      {USERS.map((user) => (
        <FormControlLabel
          key={user}
          control={
            <Checkbox
              color="secondary"
              sx={{ position: "relative", top: "-9.5px" }}
            />
          }
          label={
            <Box>
              <Typography
                variant="body1"
                color="black.main"
                sx={{ lineHeight: "16px", marginBottom: "4px" }}
              >
                Дорофеева Клавдия Олеговна
              </Typography>
              <Typography
                variant="caption"
                color="black.inactive"
                sx={{ lineHeight: "14px" }}
              >
                Владелец
              </Typography>
            </Box>
          }
          sx={{
            width: "100%",
            "&:not(:last-child)": {
              marginBottom: "16px",
            },
          }}
        />
      ))}
    </Box>
  );
};
