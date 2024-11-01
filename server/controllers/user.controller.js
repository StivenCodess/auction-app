import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import { generateToken, verifyToken } from "../helpers/jwt.js";
import { User } from "../models/index.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const getUserByIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "user not found" });
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, address, phone, role_id, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ ok: false, errors: errors.mapped() });

    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const newuser = await User.create({
      name,
      email,
      address,
      phone,
      role_id,
      password: encryptedPassword,
    });

    const token = generateToken({ name, uid: newuser.uid });

    res.status(201).json({
      ok: true,
      newuser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ error: "User not found in the database" });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({ error: "Incorrect password" });

    const token = generateToken({ name: user.name, uid: user.uid });

    res.status(200).json({
      ok: true,
      uid: user.uid,
      name: user.name,
      role: user.role_id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Failed Login" });
  }
};

export const revalidateTokenController = async (req, res) => {
  const { name, uid } = req;

  const token = generateToken({ name, uid });

  res.send({ ok: true, token });
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone, role_id } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "user not found" });

    user.update({ name, email, address, phone, role_id });
    res.status(200).json({ ok: true, user });
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

    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to deleted user" });
  }
};
