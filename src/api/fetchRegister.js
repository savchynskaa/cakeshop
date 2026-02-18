import axios from "axios";
import { API } from "./config";

export const fetchRegister = (data) => {
  return axios.post(`${API}/auth/register`, {
    email: data.email,
    password: data.password,
    name: data.name,
    role: "client",
    phone: data.phone,
  });
};
