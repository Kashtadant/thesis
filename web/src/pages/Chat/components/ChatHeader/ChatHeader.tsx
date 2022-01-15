import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ArrowDropDown, Share } from "@mui/icons-material";

import { IconLogOut } from "./IconLogOut";

export const ChatHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const onSignOut = () => {
    navigate("/auth");
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
            <Typography variant="h6">Руководящий отдел</Typography>
          </Button>
          <Typography variant="body2" color="black.emphasisMedium">
            5 участников
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
        <MenuItem component={Link} to="/chats/1" onClick={onClose}>
          Руководящий отдел
        </MenuItem>
        <MenuItem component={Link} to="/chats/2" onClick={onClose}>
          Бухгалтерский отдел
        </MenuItem>
        <MenuItem
          component={Link}
          to="/chats/new"
          sx={{ color: "primary.main" }}
        >
          Новый чат
        </MenuItem>
      </Menu>
    </>
  );
};
