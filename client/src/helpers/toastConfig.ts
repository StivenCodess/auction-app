import { ToastPosition, Bounce } from "react-toastify";

type ToastType = "login" | "update_user" | "register" | "default";

const baseConfig = {
  position: "top-right" as ToastPosition,
  autoClose: 2000,
  transition: Bounce,
};

const toastMessages = {
  login: {
    pending: { ...baseConfig, render: "Logueando..." },
    success: { ...baseConfig, render: "Inicio de sesion exitoso!" },
    error: { ...baseConfig, render: "Error al iniciar sesion." },
  },
  register: {
    pending: { ...baseConfig, render: "Registrando..." },
    success: { ...baseConfig, render: "Registro exitoso!" },
    error: { ...baseConfig, render: "Error al registrarse." },
  },
  update_user: {
    pending: { ...baseConfig, render: "Actualizando perfil..." },
    success: { ...baseConfig, render: "Perfil actualizado!" },
    error: { ...baseConfig, render: "Algo Fallo al actualizar el perfil" },
  },
  default: {
    pending: { ...baseConfig, render: "Procesando..." },
    success: { ...baseConfig, render: "Proceso exitoso! " },
    error: { ...baseConfig, render: "Algo salio mal 😓" },
  },
};

export const getToastMessages = (type: ToastType) =>
  toastMessages[type] || toastMessages.default;
