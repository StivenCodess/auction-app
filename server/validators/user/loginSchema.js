export const loginSchema = {
  email: {
    isEmail: {
      errorMessage: "No has ingresado un correo válido.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "La contraseña es obligatoria.",
    },
  },
};
