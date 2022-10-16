import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../page/Login";

const LoginRouter = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default LoginRouter;
