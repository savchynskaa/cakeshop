import axios from "axios";
import { API } from "./config";
import Cookies from "js-cookie";

export const fetchOrders = (status, baker_id) => {
  const params = {};
  const token = Cookies.get("token");

  if (status) {
    params.status = status;
  }

  if (baker_id) {
    params.baker_id = baker_id;
  }

  return axios.get(`${API}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { status, baker_id },
  });
};
