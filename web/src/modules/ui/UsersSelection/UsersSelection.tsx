import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import { IUser } from "../../features/users";

interface IUsersSelectionProps {
  users: IUser[];
  name: string;
  value: number[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const UsersSelection = ({
  users,
  name,
  value,
  onChange,
}: IUsersSelectionProps) => {
  const onCheckboxChange =
    (id: number) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const newValue = value.filter((v) => v !== id);
      if (checked) {
        newValue.push(id);
      }
      onChange({ target: { name, value: newValue } } as any);
    };

  return (
    <Box>
      {users.map((user) => (
        <FormControlLabel
          key={user.id}
          control={
            <Checkbox
              color="secondary"
              checked={value.includes(user.id)}
              onChange={onCheckboxChange(user.id)}
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
                {user.full_name}
              </Typography>
              <Typography
                variant="caption"
                color="black.inactive"
                sx={{ lineHeight: "14px" }}
              >
                {user.position}
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
