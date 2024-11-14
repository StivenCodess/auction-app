import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_CLOUDINARY_CLOUD_NAME } = getEnvVariables();

const cloudinaryApi = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
});

export default cloudinaryApi;
