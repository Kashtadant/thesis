import { useState } from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { signup, useSession } from "../../../../modules/features/session";

const SignUpSchema = Yup.object().shape({
  full_name: Yup.string().required("Поле обязательно для заполнения"),
  email: Yup.string()
    .required("Поле обязательно для заполнения")
    .email("Неверный формат"),
  password: Yup.string().required("Поле обязательно для заполнения"),
});

export const SignUp = () => {
  const { setSession } = useSession();
  const [isSending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      full_name: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      setSending(true);

      signup(values.email, values.password, values.full_name)
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
        Регистрация
      </Typography>
      <TextField
        label="ФИО"
        fullWidth
        sx={{ marginBottom: "24px" }}
        name="full_name"
        onChange={formik.handleChange}
        value={formik.values.full_name}
        error={!!formik.errors.full_name && !!formik.touched.full_name}
        helperText={formik.touched.full_name ? formik.errors.full_name : null}
      />
      <TextField
        type="email"
        label="Email"
        fullWidth
        sx={{ marginBottom: "24px" }}
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={!!formik.errors.email && !!formik.touched.email}
        helperText={formik.touched.email ? formik.errors.email : null}
      />
      <TextField
        type="password"
        label="Пароль"
        fullWidth
        sx={{ marginBottom: "32px" }}
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
        Регистрация
      </Button>
      <Button
        component={Link}
        to="../signin"
        color="inherit"
        sx={{ color: "black.inactive", height: "32px" }}
      >
        Вход
      </Button>
    </Paper>
  );
};
