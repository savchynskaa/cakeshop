import axios from "axios";
import { API } from "./config";
import Cookies from "js-cookie";

export const fetchUpdateOrderStatus = (id, status) => {
  const token = Cookies.get("token");

  return axios.patch(
    `${API}/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
