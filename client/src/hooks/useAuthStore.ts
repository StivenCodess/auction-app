/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, RootState, onLogout } from "../store";
import { toast } from "react-toastify";

import {
  loginUser,
  registerUser,
  revalidateToken,
} from "../services/userService";

import { getToastMessages } from "../helpers/";

interface RegisterData {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const startLogin = async (email_user: string, password_user: string) => {
    dispatch(onChecking());
    const toastConfig = getToastMessages("login");

    try {
      const { data } = await toast.promise(
        loginUser({ email_user, password_user }),
        toastConfig
      );

      const { token, ...userData } = data;
      localStorage.setItem("token", token);

      dispatch(onLogin(userData));
    } catch (error) {
      dispatch(onLogout());
    }
  };

  const startRegister = async (formState: RegisterData) => {
    dispatch(onChecking());
    const toastConfig = getToastMessages("register");

    try {
      const { data } = await toast.promise(
        registerUser(formState),
        toastConfig
      );

      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.dataValues));
    } catch (error) {
      dispatch(onLogout());
    }
  };

  const checkAuthToken = async () => {
    dispatch(onChecking());

    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await revalidateToken();

      const { token, ...userData } = data;
      localStorage.setItem("token", token);

      dispatch(onLogin(userData));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};

export default useAuthStore;
