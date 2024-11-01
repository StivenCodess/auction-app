export const createUserSchema = {
  name: {
    notEmpty: {
      errorMessage: "No has ingresado un nombre.",
    },
  },
  email: {
    isEmail: {
      errorMessage: "No has ingresado un correo valido.",
    },
  },
  phone: {
    isLength: {
      options: {
        min: 10,
        max: 10,
      },
      errorMessage: "No has ingresado un numero valido.",
    },
  },
  password: {
    isLength: {
      options: { min: 5 },
      errorMessage: "La contraseña debe tener al menos 6 caracteres.",
    },
  },
};
