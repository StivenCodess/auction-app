import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, RegisterPage } from "../auth";
import Products from "../products/pages/Products";
import { useState } from "react";

const AppRouter = () => {
  const [authStatus, setAuauthStatus] = useState("not-authenticated");

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route path="/auth/login" element={<LoginPage />} />
      ) : (
        <Route path="/" element={<Products />} />
      )}

      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};

export default AppRouter;
