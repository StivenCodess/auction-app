import { User } from "../models/index.js";
import { admin } from "../config/index.js";

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

const firebaseCreateUser = async (email, password) => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    return userRecord.uid;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, address, phone, role_id, password } = req.body;
    const uid = await firebaseCreateUser(email, password);

    const newuser = await User.create({
      id: uid,
      name,
      email,
      address,
      phone,
      role_id,
      password,
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
