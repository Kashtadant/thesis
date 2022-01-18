import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  createRoom,
  updateRoomUsers,
} from "../../../../modules/features/rooms";
import { IUser, getUsers } from "../../../../modules/features/users";

import { UsersSelection } from "../../../../modules/ui/UsersSelection";

const ChatFormSchema = Yup.object().shape({
  name: Yup.string().required("Поле обязательно для заполнения"),
});

interface IChatFormProps {
  user: IUser;
}

export const ChatForm = ({ user }: IChatFormProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isSending, setSending] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik<{ name: string; members: number[] }>({
    initialValues: {
      name: "",
      members: [],
    },
    validationSchema: ChatFormSchema,
    onSubmit: (values) => {
      setSending(true);

      createRoom(values.name)
        .then((room) =>
          Promise.all([
            Promise.resolve(room),
            updateRoomUsers(room.id, values.members.concat(user.id)),
          ])
        )
        .then(([room]) => {
          navigate(`../${room.id}`);
        })
        .catch(() => {
          setSending(false);
        });
    },
  });

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFetching(false);
    });
  }, []);

  if (isFetching) {
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
          sx={{ marginBottom: "24px" }}
          component="div"
          variant="overline"
        >
          Новый чат
        </Typography>

        <TextField
          sx={{ marginBottom: "16px" }}
          label="Название чата"
          fullWidth
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={!!formik.errors.name && !!formik.touched.name}
          helperText={formik.touched.name ? formik.errors.name : null}
        />

        <Typography
          component="div"
          variant="overline"
          sx={{ marginBottom: "16px" }}
        >
          Добавить сотрудников
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
            color="inherit"
            variant="outlined"
            sx={{
              color: "#515151",
              borderColor: "#D7D7D7",
              marginRight: "14px",
              height: "36px",
            }}
            onClick={() => window.history.back()}
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
            Создать
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
