import { Box, Grid, Stack } from "@mui/material";
import { colors } from "../utils/colors";
import { CakeOrderItem } from "../components/CakeOrderItem/CakeOrderItem";
import { fetchOrders } from "../api/fetchOrders";
import { useEffect, useState } from "react";
import { useUser } from "../utils/userContext";
import { fetchUpdateOrderStatus } from "../api/fetchUpdateOrderStatus";
import { snackService } from "../components/Snackbar/SnackbarUtils";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useUser();

  const getOrders = async () => {
    try {
      const cakeTypes = await fetchOrders("inProgress", user?.id);

      setOrders(cakeTypes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [user?.id]);

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
        Мої замовлення
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
              fetchUpdateOrderStatus(order.id, "ready")
                .then(() => {
                  snackService.success("Замовлення виконано!");
                  window.location.reload();
                })
                .catch(() =>
                  snackService.error(
                    "Упс, щось пішло не так. Спробуйте пізніше!"
                  )
                );
            }}
            buttonName="Готово"
            order={order}
          />
        ))}
      </Stack>
    </Stack>
  );
};
