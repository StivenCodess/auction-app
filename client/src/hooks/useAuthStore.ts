import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api";
import { onChecking, onLogin } from "../store";

const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email: string, password: string) => {
    dispatch(onChecking());

    try {
      const { data } = await authApi.post("/user/login", { email, password });
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    status,
    user,
    errorMessage,

    startLogin,
  };
};

export default useAuthStore;
