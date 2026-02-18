import axios from "axios";
import { API } from "./config";

export const fetchReviews = () => {
  return axios.get(`${API}/reviews`);
};
