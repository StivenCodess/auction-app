import { User } from "../models/index.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const getUserByIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, address, phone, role_id } = req.body;
    const newuser = await User.create({
      name,
      email,
      address,
      phone,
      role_id,
    });
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone, role_id } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "user not found" });

    user.update({ name, email, address, phone, role_id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "user not found" });
    user.destroy();

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to deleted user" });
  }
};
