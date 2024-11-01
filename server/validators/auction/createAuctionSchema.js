export const createAuctionSchema = {
  start_date: {
    isISO8601: {
      errorMessage: "La fecha de inicio debe estar en formato ISO8601.",
    },
  },
  end_date: {
    isISO8601: {
      errorMessage: "La fecha de fin debe estar en formato ISO8601.",
    },
  },
  starting_price: {
    isFloat: {
      options: { min: 0 },
      errorMessage: "No has ingresado un precio valido",
    },
  },
};
