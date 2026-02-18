import axios from "axios";
import { API } from "./config";

export const fetchCakeTypes = () => {
  return axios.get(`${API}/cake-types`);
};
