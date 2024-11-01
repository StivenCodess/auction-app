export const createProductSchema = {
  name: {
    notEmpty: {
      errorMessage: "El nombre del producto es obligatorio.",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "La descripción del producto es obligatoria.",
    },
  },
  image_url: {
    isURL: {
      errorMessage: "URL de imagen no válida.",
    },
  },
  price: {
    isFloat: {
      options: { min: 0 },
      errorMessage: "No has ingresado un precio valido.",
    },
  },
};
