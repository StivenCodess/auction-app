import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api";
import { onChecking, onLogin, RootState, onLogout } from "../store";
import { Bounce, toast } from "react-toastify";

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

    try {
      const { data } = await toast.promise(
        authApi.post("/user/login", { email_user, password_user }),
        {
          pending: {
            render: "Promise is pending",
            position: "top-right",
            autoClose: 2000,
            transition: Bounce,
          },
          success: {
            render: "Promise resolved 👌",
            position: "top-right",
            autoClose: 2000,
            transition: Bounce,
          },
          error: {
            render: "Promise error 👌",
            position: "top-right",
            autoClose: 2000,
            transition: Bounce,
          },
        }
      );

      const { token, ...userData } = data;
      localStorage.setItem("token", token);

      dispatch(onLogin(userData));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(onLogout());
    }
  };

  const startRegister = async (formState: RegisterData) => {
    dispatch(onChecking());

    try {
      const { data } = await authApi.post("/user", formState);
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.dataValues));
    } catch (error) {
      dispatch(onLogout());
      console.log(error);
    }
  };

  const checkAuthToken = async () => {
    dispatch(onChecking());

    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await authApi.get("/user/renew");
      const { token, ...userData } = data;
      localStorage.setItem("token", token);

      dispatch(onLogin(userData));
    } catch (error) {
      console.log(error);
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
