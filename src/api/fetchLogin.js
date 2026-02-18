import axios from "axios";
import { API } from "./config";

export const fetchLogin = (values) => {
  return axios.post(`${API}/auth/login`, {
    email: values.email,
    password: values.password,
  });
};
