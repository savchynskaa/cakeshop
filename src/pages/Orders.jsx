import { Box, Stack } from "@mui/material";
import { colors } from "../utils/colors";
import { CakeOrderItem } from "../components/CakeOrderItem/CakeOrderItem";
import { useState, useEffect } from "react";
import { fetchOrders } from "../api/fetchOrders";
import { fetchUpdateOrderStatus } from "../api/fetchUpdateOrderStatus";
import { snackService } from "../components/Snackbar/SnackbarUtils";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const cakeTypes = await fetchOrders("pending");

      setOrders(cakeTypes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Stack letterSpacing="2px">
      <Box
        sx={{
          fontSize: "32px",
          fontFamily: "GarciaMarquez",
          padding: "23px 37px",
          color: colors.main,
          my: "10px",
        }}
      >
        Всі замовлення
      </Box>

      <Box
        sx={{
          height: "1px",
          bgcolor: colors.main,
          width: "95%",
          display: "flex",
          alignSelf: "center",
          mb: "50px",
        }}
      ></Box>

      <Stack px="77px">
        {orders.map((order) => (
          <CakeOrderItem
            key={order.id}
            onClick={() => {
              fetchUpdateOrderStatus(order.id, "inProgress")
                .then(() => {
                  snackService.success("Замовлення успішно взяте в роботу!");
                  window.location.reload();
                })
                .catch(() =>
                  snackService.error(
                    "Упс, щось пішло не так. Спробуйте пізніше!"
                  )
                );
            }}
            buttonName="Прийняти"
            order={order}
          />
        ))}
      </Stack>
    </Stack>
  );
};
