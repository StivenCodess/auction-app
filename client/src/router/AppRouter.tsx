import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuthStore } from "../hooks";
import { LoginPage, RegisterPage, UserPage } from "../pages/";

const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "checking")
    return (
      <>
        <ToastContainer />
        <h3>Loading...</h3>
      </>
    );

  return (
    <>
      <ToastContainer />
      <Routes>
        {status === "not-authenticated" ? (
          <Route path="/auth/login" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/user" element={<UserPage />} />
            <Route path="/*" element={<Navigate to={"/user"} />} />
          </>
        )}

        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
      </Routes>
    </>
  );
};

export default AppRouter;
