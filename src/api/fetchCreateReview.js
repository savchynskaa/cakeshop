import axios from "axios";
import { API } from "./config";
import Cookies from "js-cookie";

export const fetchCreateReview = (review) => {
  const token = Cookies.get("token");
  
  return axios.post(`${API}/reviews`, {comment: review.comment, rating: Number(review.rating)}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
