import { api } from "../api";

type userDataType = {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
};

export const registerUser = async (userData: userDataType) => {
  console.log(userData);
  const response = await api.post("/user", userData);
  return response.data;
};

export const loginUser = async (loginData: {
  email_user: string;
  password_user: string;
}) => {
  const response = await api.post("/user/login", loginData);
  return response;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const revalidateToken = async () => {
  const response = await api.get("/user/renew");
  return response;
};
