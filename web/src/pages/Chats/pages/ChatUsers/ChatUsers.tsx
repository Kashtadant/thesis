import { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
  IRoom,
  getRoom,
  updateRoomUsers,
} from "../../../../modules/features/rooms";
import { IUser, getUsers } from "../../../../modules/features/users";

import { UsersSelection } from "../../../../modules/ui/UsersSelection";

interface IChatUsersProps {
  user: IUser;
}

export const ChatUsers = ({ user }: IChatUsersProps) => {
  const { id } = useParams<{ id: string }>();

  const [room, setRoom] = useState<IRoom | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isSending, setSending] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik<{ members: number[] }>({
    initialValues: {
      members: [],
    },
    onSubmit: (values) => {
      if (room) {
        setSending(true);

        updateRoomUsers(room.id, values.members.concat(user.id))
          .then(() => {
            navigate(`../${room.id}`);
          })
          .catch(() => {
            setSending(false);
          });
      }
    },
  });

  useEffect(() => {
    Promise.all([getUsers(), getRoom(+id!)]).then(([users, room]) => {
      setUsers(users);
      setRoom(room);
      formik.setFieldValue(
        "members",
        room.members.map((u) => u.id).filter((u) => u !== user.id)
      );
      setFetching(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isFetching || !room) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        elevation={1}
        sx={{
          width: "100%",
          maxWidth: "560px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="div"
          variant="overline"
          sx={{ marginBottom: "16px" }}
        >
          Добавление пользователей
        </Typography>

        <UsersSelection
          users={users.filter((u) => u.id !== user.id)}
          name="members"
          onChange={formik.handleChange}
          value={formik.values.members}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            component={Link}
            to={`../${id}`}
            color="inherit"
            variant="outlined"
            sx={{
              color: "#515151",
              borderColor: "#D7D7D7",
              marginRight: "14px",
              height: "36px",
            }}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isSending}
            sx={{ height: "36px" }}
          >
            Сохранить
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
