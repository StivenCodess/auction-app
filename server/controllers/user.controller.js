export const getUsers = async (req, res) => {
  res.send("Getting User");
};

export const getUserByIndex = async (req, res) => {
  res.send("Getting User id");
};

export const createUser = async (req, res) => {
  res.send("Creating User");
};

export const updateUser = async (req, res) => {
  res.send("Updating User");
};

export const deleteUser = async (req, res) => {
  res.send("Deleting User");
};
