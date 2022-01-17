import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  Notifications,
  Settings,
  MoreVert,
  InsertDriveFile,
  Add,
} from "@mui/icons-material";

import { getRoomFiles, IRoom } from "../../../../../../modules/features/rooms";
import { IUser } from "../../../../../../modules/features/users";
import { IFile } from "../../../../../../modules/features/files";

interface IChatDrawerProps {
  room: IRoom;
  user: IUser;
}

export const ChatDrawer = ({ room, user }: IChatDrawerProps) => {
  const { id } = useParams<{ id: string }>();
  const [files, setFiles] = useState<IFile[]>([]);

  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

  const onUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserAnchorEl(event.currentTarget);
  };
  const onUserClose = () => {
    setUserAnchorEl(null);
  };

  const [documentAnchorEl, setDocumentAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const onDocumentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDocumentAnchorEl(event.currentTarget);
  };

  const onDocumentClose = () => {
    setDocumentAnchorEl(null);
  };

  useEffect(() => {
    if (id) {
      getRoomFiles(+id).then((data) => {
        setFiles(data);
      });
    }
  }, []);

  return (
    <>
      <Drawer
        sx={{
          width: 256,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 256,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: "24px 16px", display: "flex" }}>
          <Avatar src={user.avatar} sx={{ marginRight: "16px" }} />
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              color="black.emphasisHigh"
              sx={{ marginBottom: "6px" }}
            >
              {user.full_name}
            </Typography>
            <Typography
              variant="body2"
              color="black.inactive"
              sx={{ lineHeight: "15px" }}
            >
              {user.position}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <List>
          {room.members.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" onClick={onUserClick}>
                  <MoreVert />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Avatar src={user.avatar} />
              </ListItemIcon>
              <ListItemText
                primary={user.full_name}
                secondary={user.position}
                sx={{
                  "& .MuiListItemText-primary": {
                    typography: "subtitle2",
                    color: "primary.main",
                    marginBottom: "1px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  "& .MuiListItemText-secondary": {
                    typography: "caption",
                    color: "black.inactive",
                  },
                }}
              />
            </ListItem>
          ))}
          <ListItem
            component={Link}
            to={`/chats/${id}/users`}
            button
            sx={{ color: "rgba(33, 150, 243, 0.64)" }}
          >
            <ListItemText primary="Добавить пользователя" />
            <Add />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ padding: "16px", paddingBottom: 0 }}>
          <Typography variant="body2" color="black.emphasisMedium">
            Требуют доработки
          </Typography>
        </Box>
        <List sx={{ paddingTop: "3px" }}>
          {files.map((file) => (
            <ListItem
              key={file.url}
              secondaryAction={
                <IconButton edge="end" onClick={onDocumentClick}>
                  <MoreVert />
                </IconButton>
              }
              button
              component="a"
              href={file.url}
              target="_blank"
              download
            >
              <ListItemIcon>
                <InsertDriveFile fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={`До 10.10.2022`}
                sx={{
                  "& .MuiListItemText-primary": {
                    typography: "subtitle2",
                    color: "primary.main",
                    marginBottom: "1px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  "& .MuiListItemText-secondary": {
                    typography: "caption",
                    color: "black.inactive",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <List sx={{ marginTop: "auto" }}>
          <ListItem button>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Уведомления"
              sx={{
                "& .MuiListItemText-primary": {
                  typography: "subtitle2",
                  color: "black.emphasisHigh",
                },
              }}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText
              primary="Настройки"
              sx={{
                "& .MuiListItemText-primary": {
                  typography: "subtitle2",
                  color: "black.emphasisHigh",
                },
              }}
            />
          </ListItem>
        </List>
      </Drawer>
      <Menu anchorEl={userAnchorEl} open={!!userAnchorEl} onClose={onUserClose}>
        <MenuItem>Заглушить</MenuItem>
        <MenuItem>Написать</MenuItem>
        <MenuItem sx={{ color: "error.main" }}>Выгнать</MenuItem>
      </Menu>
      <Menu
        anchorEl={documentAnchorEl}
        open={!!documentAnchorEl}
        onClose={onDocumentClose}
      >
        <MenuItem>Принять всё</MenuItem>
        <MenuItem>Отказать всему</MenuItem>
        <MenuItem sx={{ color: "error.main" }}>Удалить</MenuItem>
      </Menu>
    </>
  );
};
