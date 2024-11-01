export const createBidSchema = {
  amount: {
    isFloat: {
      options: { min: 0.01 },
      errorMessage: "No has ingresado un monto valido.",
    },
  },
};
