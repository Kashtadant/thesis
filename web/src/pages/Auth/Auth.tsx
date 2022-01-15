import { Routes, Route, Navigate } from "react-router-dom";

import Box from "@mui/material/Box";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

export const Auth = () => {
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
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="signin" replace />} />
      </Routes>
    </Box>
  );
};
