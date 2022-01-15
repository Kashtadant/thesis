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

import Photo0 from "../../../../modules/features/users/0.jpg";
import Photo1 from "../../../../modules/features/users/1.jpg";
import Photo2 from "../../../../modules/features/users/2.jpg";
import Photo3 from "../../../../modules/features/users/3.jpg";
import Photo4 from "../../../../modules/features/users/4.jpg";

const USERS = [
  {
    name: "Аня Матвеева",
    position: "Бухгалтер",
    photo: Photo1,
  },
  {
    name: "Вадим Нестеренко",
    position: "Директор",
    photo: Photo2,
  },
  {
    name: "Денис Соболь",
    position: "Владелец",
    photo: Photo3,
  },
  {
    name: "Мария Диденко",
    position: "Зам директора",
    photo: Photo4,
  },
];

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

export const ChatDrawer = () => {
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
        <Avatar src={Photo0} sx={{ marginRight: "16px" }} />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            color="black.emphasisHigh"
            sx={{ marginBottom: "6px" }}
          >
            Владимир Быков
          </Typography>
          <Typography
            variant="body2"
            color="black.inactive"
            sx={{ lineHeight: "15px" }}
          >
            Документовед
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {USERS.map((user) => (
          <ListItem
            key={user.name}
            secondaryAction={
              <IconButton edge="end">
                <MoreVert />
              </IconButton>
            }
            sx={{ paddingRight: 0 }}
          >
            <ListItemIcon>
              <Avatar src={user.photo} />
            </ListItemIcon>
            <ListItemText
              primary={user.name}
              secondary={user.position}
              sx={{
                "& .MuiListItemText-primary": {
                  typography: "subtitle2",
                  color: "primary.main",
                  marginBottom: "1px",
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
            sx={{ paddingRight: 0 }}
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
