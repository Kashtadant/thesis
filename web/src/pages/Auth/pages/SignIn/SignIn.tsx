import { useState } from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { signin, useSession } from "../../../../modules/features/session";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Поле обязательно для заполнения")
    .email("Неверный формат"),
  password: Yup.string().required("Поле обязательно для заполнения"),
});

export const SignIn = () => {
  const { setSession } = useSession();
  const [isSending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      setSending(true);

      signin(values.email, values.password)
        .then((response) => {
          setSession(response.data);
        })
        .catch(() => {
          setSending(false);
        });
    },
  });

  return (
    <Paper
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: "400px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: "24px" }}>
        Вход
      </Typography>
      <TextField
        sx={{ marginBottom: "24px" }}
        type="email"
        label="Email"
        fullWidth
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={!!formik.errors.email && !!formik.touched.email}
        helperText={formik.touched.email ? formik.errors.email : null}
      />
      <TextField
        sx={{ marginBottom: "32px" }}
        type="password"
        label="Пароль"
        fullWidth
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={!!formik.errors.password && !!formik.touched.password}
        helperText={formik.touched.password ? formik.errors.password : null}
      />
      <Button
        sx={{ marginBottom: "32px", height: "56px" }}
        type="submit"
        color="primary"
        variant="contained"
        disableElevation
        fullWidth
        disabled={isSending}
      >
        Войти
      </Button>
      <Button
        sx={{ color: "black.inactive", height: "32px" }}
        component={Link}
        to="../signup"
        color="inherit"
      >
        Регистрация
      </Button>
    </Paper>
  );
};
