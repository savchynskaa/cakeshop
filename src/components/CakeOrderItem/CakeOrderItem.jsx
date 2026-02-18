import {
  alpha,
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
} from "@mui/material";
import { colors } from "../../utils/colors";
import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { uk } from "date-fns/locale";
import { format } from "date-fns";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CakeOrderItem = ({ buttonName, onClick, order }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const formattedDate = format(
    new Date(order.pickup_date),
    "dd.MM.yyyy 'о' HH:mm",
    { locale: uk }
  );

  return (
    <>
      <Stack direction="row" gap="30px" color={colors.second}>
        <img
          src={order.image_url}
          alt={order.cake_name}
          style={{
            width: "300px",
            height: "300px",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        />

        <Stack gap="8px">
          <Box
            sx={{
              fontSize: "24px",
              fontFamily: "GarciaMarquez",
              color: colors.main,
            }}
          >
            {order.cake_name}
          </Box>

          <Box fontWeight="bold" mt="20px">
            Примітка:
          </Box>

          <Box maxWidth="350px" letterSpacing="1.5px">
            {order.comment || "Не вказано"}
          </Box>

          <Box fontWeight="bold" mt="5px">
            Дата: {formattedDate}
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt="auto"
          >
            <Box fontSize="24px">
              {Number(order.weight) ? Number(order.weight).toFixed(1) : "0"} кг
            </Box>

            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              sx={{
                bgcolor: colors.second,
                borderRadius: "50px",
                textTransform: "none",
                fontFamily: "Montserrat",
                "&:active": {
                  bgcolor: colors.main,
                },
              }}
            >
              {buttonName}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Box
        sx={{
          height: "1px",
          bgcolor: colors.main,
          width: "107%",
          display: "flex",
          alignSelf: "center",
          my: "50px",
        }}
      ></Box>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              width: "30px",
              height: "30px",
              position: "absolute",
              top: "3%",
              right: "3%",
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
          <img
            src={order.image_url}
            alt={order.cake_name}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "600px",
              maxHeight: "600px",
              borderRadius: 4,
            }}
          />
        </Box>
      </Backdrop>

      <Dialog
        open={openModal}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setOpenModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Підтвердження замовлення"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {order.status === "pending" &&
              "Ви дійсно бажаєте взяти це замовлення в роботу?"}
            {order.status === "inProgress" &&
              "Ви дійсно хочете позначити це замовлення як виконане?"}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ flexDirection: "column", gap: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              onClick();
              setOpenModal(false);
            }}
            sx={{
              maxWidth: "300px",
              bgcolor: colors.main,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "Montserrat",
            }}
          >
            Підтверджую
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setOpenModal(false)}
            sx={{
              maxWidth: "300px",
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "Montserrat",
              borderColor: colors.second,
              color: colors.second,
              "&:hover": {
                bgcolor: alpha(colors.second, 0.1),
              },
            }}
          >
            Скасувати
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
