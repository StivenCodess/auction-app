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
    const {
      name: userName,
      email: userEmail,
      address: userAddress,
      phone: userPhone,
      role_id: userRoleId,
      password,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ ok: false, errors: errors.mapped() });

    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const newuser = await User.create({
      name: userName,
      email: userEmail,
      address: userAddress,
      phone: userPhone,
      role_id: userRoleId,
      password: encryptedPassword,
    });

    const { uid, name, email, address, phone, role_id } = newuser;

    const token = generateToken({ uid, name, email, address, phone, role_id });

    res.status(201).json({
      ok: true,
      ...newuser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  const { email_user, password_user } = req.body;

  try {
    const user = await User.findOne({ where: { email: email_user } });

    if (!user)
      return res.status(404).json({ error: "User not found in the database" });

    const { uid, name, email, address, phone, password, photo_url, role_id } =
      user;

    const validPassword = bcrypt.compareSync(password_user, password);

    if (!validPassword)
      return res.status(400).json({ error: "Incorrect password" });

    const token = generateToken({
      uid,
      name,
      address,
      phone,
      email,
      photo_url,
      role_id,
    });

    res.status(200).json({
      ok: true,
      uid,
      name,
      role_id,
      address,
      phone,
      email,
      photo_url,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Failed Login" });
  }
};

export const revalidateTokenController = async (req, res) => {
  const { name, uid, address, role_id, phone, email, photo_url } =
    req.authToken;

  const token = generateToken({
    name,
    uid,
    address,
    role_id,
    phone,
    email,
    photo_url,
  });

  res.send({
    ok: true,
    token,
    name,
    uid,
    address,
    role_id,
    phone,
    email,
    photo_url,
  });
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone, role_id, photo_url } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "user not found" });

    user.update({ name, email, address, phone, role_id, photo_url });
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
