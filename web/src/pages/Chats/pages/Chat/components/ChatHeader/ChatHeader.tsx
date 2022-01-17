import { useState, Fragment } from "react";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ArrowDropDown, Share } from "@mui/icons-material";

import { IRoom } from "../../../../../../modules/features/rooms";
import { useSession } from "../../../../../../modules/features/session";

import { IconLogOut } from "./IconLogOut";

interface IChatHeaderProps {
  room: IRoom;
  rooms: IRoom[];
}

export function inclineUsers(count: number) {
  if (count % 100 > 10 && count % 100 < 20) {
    return "участников";
  }

  switch (count % 10) {
    case 1:
      return "участник";
    case 2:
    case 3:
    case 4:
      return "участника";
    default:
      return "участников";
  }
}

export const ChatHeader = ({ room, rooms }: IChatHeaderProps) => {
  const { setSession } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    setSession(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
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
          <Button
            color="inherit"
            sx={{
              color: "black.emphasisHight",
              textTransform: "none",
              padding: "1px 4px",
              marginLeft: "-4px",
              marginTop: "-1px",
            }}
            endIcon={<ArrowDropDown sx={{ color: "black.inactive" }} />}
            onClick={onClick}
            id="header-button"
            aria-controls={!!anchorEl ? "header-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={!!anchorEl ? "true" : undefined}
          >
            <Typography variant="h6">{room.name}</Typography>
          </Button>
          <Typography variant="body2" color="black.emphasisMedium">
            {room.members.length} {inclineUsers(room.members.length)}
          </Typography>
        </Box>
        <IconButton sx={{ marginLeft: "auto", marginRight: "8px" }}>
          <Share />
        </IconButton>
        <IconButton edge="end" onClick={onSignOut}>
          <IconLogOut />
        </IconButton>
      </Box>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "header-button",
        }}
      >
        {rooms
          .filter((r) => r.id !== room.id)
          .map((r) => (
            <MenuItem
              key={r.id}
              component={Link}
              to={`../${r.id}`}
              onClick={onClose}
            >
              {r.name}
            </MenuItem>
          ))}
        <MenuItem component={Link} to="../new" sx={{ color: "primary.main" }}>
          Новый чат
        </MenuItem>
      </Menu>
    </>
  );
};
