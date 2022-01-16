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

import {
  Notifications,
  Settings,
  MoreVert,
  InsertDriveFile,
  Add,
} from "@mui/icons-material";

import { IRoom } from "../../../../../../modules/features/rooms";
import { IUser } from "../../../../../../modules/features/users";

const DOCUMENTS = [
  {
    name: "Приказ ФНС России...",
    date: "12.12.2021",
  },
  {
    name: "Декларация по НДС",
    date: "22.12.2021",
  },
  {
    name: "Декларация по нало...",
    date: "27.11.2021",
  },
];

interface IChatDrawerProps {
  room: IRoom;
  user: IUser;
}

export const ChatDrawer = ({ room, user }: IChatDrawerProps) => {
  const { id } = useParams<{ id: string }>();

  return (
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
              <IconButton edge="end">
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
        {DOCUMENTS.map((document) => (
          <ListItem
            key={document.name}
            secondaryAction={
              <IconButton edge="end">
                <MoreVert />
              </IconButton>
            }
          >
            <ListItemIcon>
              <InsertDriveFile fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={document.name}
              secondary={`До ${document.date}`}
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
  );
};
