import axios from "axios";
import { API } from "./config";

export const fetchCakeTypeNames = () => {
  return axios.get(`${API}/cake-types/ids-names`);
};
