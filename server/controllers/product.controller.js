export const getProducts = async (req, res) => {
  res.send("Getting Products");
};

export const getProductByIndex = async (req, res) => {
  res.send("Getting Product id");
};

export const createProduct = async (req, res) => {
  res.send("Creating Product");
};

export const updateProduct = async (req, res) => {
  res.send("Updating Product");
};

export const deleteProduct = async (req, res) => {
  res.send("Deleting Product");
};
