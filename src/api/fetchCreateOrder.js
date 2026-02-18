import axios from "axios";
import { API } from "./config";
import Cookies from "js-cookie";

const formatLocalDateForSQL = (date) => {
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const fetchCreateOrder = (order) => {
  const token = Cookies.get("token");
  const formData = new FormData();
  formData.append("cake_type_id", order.cake);
  formData.append("weight", order.weight);
  formData.append("note", order.notes);
  formData.append("pickup_datetime", formatLocalDateForSQL(order.date));
  formData.append("image", order.file);

  return axios.post(`${API}/orders`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
