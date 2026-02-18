import { useOrderForm } from "../forms/useOrderForm";
import { colors } from "../utils/colors";
import {
  alpha,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import FileUploadButton from "../components/FileUploadButton/FileUploadButton";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import { HeaderButton } from "../components/HeaderButton/HeaderButton";
import { forwardRef } from "react";
import { useEffect } from "react";
import { fetchCakeTypeNames } from "../api/fetchCakeTypeNames";
import { uk } from "date-fns/locale";
import { format } from "date-fns";
import { fetchCreateOrder } from "../api/fetchCreateOrder";
import { snackService } from "../components/Snackbar/SnackbarUtils";
import { useNavigate, useParams } from "react-router";

const weightOptions = [
  { value: 1, label: "1 кг" },
  { value: 1.5, label: "1.5 кг" },
  { value: 2, label: "2 кг" },
  { value: 2.5, label: "2.5 кг" },
  { value: 3, label: "3 кг" },
];

const StyledPicker = styled(DatePicker)`
  .rs-picker-toggle {
    border-radius: 20px !important;
    border: 1px solid red !important;
  }
`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const OrderForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [openCake, setOpenCake] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [open, setOpen] = useState(false);
  const [cakes, setCakes] = useState([]);
  const [currentCake, setCurrentCake] = useState({});
  const [loading, setLoading] = useState(true);
  const id = params ? Number(params.id) : 0;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async (values) => {
    setLoading(true);
    try {
      await fetchCreateOrder(values);

      setLoading(false);
      snackService.success("Замовлення успішно створене!");
      navigate("/catalog");
    } catch (error) {
      console.error(error);
      snackService.error(error.response.data.message);
      setLoading(false);
    }
  };

  const getCakes = async () => {
    try {
      const cakeTypes = await fetchCakeTypeNames();

      setLoading(false);
      setCakes(cakeTypes.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const cakePrice = (price, weight) => {
    const cakePrice = Number(price) ? Number(price).toFixed() : 0;

    return cakePrice * weight;
  };

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    submitForm,
  } = useOrderForm(submit);

  const formattedDate =
    values.date && format(values.date, "dd.MM.yyyy 'о' HH:mm", { locale: uk });

  useEffect(() => {
    getCakes();
  }, []);

  useEffect(() => {
    setCurrentCake(
      cakes.find((cake) => cake.id === values.cake || cake.id === id)
    );
  }, [values.cake, id, cakes]);

  useEffect(() => {
    if (id) setFieldValue("cake", id);
  }, [id]);

  return (
    <>
      <HeaderButton />

      <Box
        sx={{
          textAlign: "center",
          fontSize: "32px",
          color: colors.second,
          fontWeight: "bold",
          mb: "30px",
        }}
      >
        Зробити замовлення
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mx: "auto" }}
      >
        <FormControl fullWidth>
          <InputLabel
            id="cake-select-label"
            sx={{
              color: colors.second,
              fontFamily: "Montserrat",
              "&.Mui-focused": {
                color: colors.second,
              },
              "&.MuiInputLabel-shrink": {
                fontFamily: "Montserrat",
              },
            }}
          >
            Торт
          </InputLabel>
          <Select
            error={touched.cake && !!errors.cake}
            labelId="cake-select-label"
            id="cake-select"
            value={values.cake}
            label="Торт"
            name="cake"
            onChange={handleChange}
            onOpen={() => setOpenCake(true)}
            onClose={() => setOpenCake(false)}
            IconComponent={() => (
              <Box
                sx={{
                  pr: "15px",
                  color: colors.main,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={openCake ? faChevronUp : faChevronDown}
                />
              </Box>
            )}
            input={
              <OutlinedInput
                label="Торт"
                sx={{
                  borderRadius: "20px",
                  fontFamily: "Montserrat !important",
                  "& fieldset": {
                    borderColor: `${colors.light} !important`,
                  },
                  "&:hover fieldset": {
                    borderColor: `${colors.second} !important`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `${colors.light} !important`,
                  },
                }}
              />
            }
          >
            {cakes.map((cake) => (
              <MenuItem key={cake.id} value={cake.id}>
                {cake.name}
              </MenuItem>
            ))}
          </Select>

          {touched.cake && errors.cake && (
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {errors.cake}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mt: "15px" }}>
          <InputLabel
            id="weight-select-label"
            sx={{
              color: colors.second,
              fontFamily: "Montserrat",
              "&.Mui-focused": {
                color: colors.second,
              },
              "&.MuiInputLabel-shrink": {
                fontFamily: "Montserrat",
              },
            }}
          >
            Вага
          </InputLabel>
          <Select
            error={touched.weight && !!errors.weight}
            labelId="weight-select-label"
            id="weight-select"
            value={values.weight}
            label="Вага"
            name="weight"
            onChange={handleChange}
            onOpen={() => setOpenWeight(true)}
            onClose={() => setOpenWeight(false)}
            IconComponent={() => (
              <Box
                sx={{
                  pr: "15px",
                  color: colors.main,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={openWeight ? faChevronUp : faChevronDown}
                />
              </Box>
            )}
            input={
              <OutlinedInput
                label="Вага"
                sx={{
                  borderRadius: "20px",
                  fontFamily: "Montserrat !important",
                  "& fieldset": {
                    borderColor: `${colors.light} !important`,
                  },
                  "&:hover fieldset": {
                    borderColor: `${colors.second} !important`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `${colors.light} !important`,
                  },
                }}
              />
            }
          >
            {weightOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {touched.weight && errors.weight && (
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {errors.weight}
            </FormHelperText>
          )}
        </FormControl>

        <StyledPicker
          isoWeek
          block
          placeholder="Оберіть дату та час"
          size="lg"
          format="MM/dd/yyyy HH:mm"
          editable={false}
          shouldDisableDate={(date) => isBefore(date, addDays(new Date(), 2))}
          shouldDisableHour={(hour) => hour < 8 || hour > 20}
          hideMinutes={(minute) => minute % 5 !== 0}
          onChange={(date) => setFieldValue("date", date)}
          locale={{
            sunday: "Нд",
            monday: "Пн",
            tuesday: "Вт",
            wednesday: "Ср",
            thursday: "Чт",
            friday: "Пт",
            saturday: "Сб",
            ok: "Ок",
            today: "Сьогодні",
            yesterday: "Вчора",
            hours: "Години",
            minutes: "Хвилини",
          }}
          style={{
            borderRadius: "20px !important",
          }}
        />

        {touched.date && errors.date && (
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {errors.date}
          </FormHelperText>
        )}

        <TextField
          multiline
          rows={3}
          fullWidth
          id="notes"
          name="notes"
          label="Примітки"
          margin="normal"
          type="text"
          value={values.notes}
          onChange={handleChange}
          error={touched.notes && !!errors.notes}
          helperText={touched.notes && errors.notes}
          sx={{
            "& .MuiInputLabel-root": {
              color: colors.second,
              fontFamily: "Montserrat !important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.second,
            },
            "&:hover fieldset": {
              borderColor: `${colors.second} !important`,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              fontFamily: "Montserrat !important",
              "& fieldset": {
                borderColor: colors.light,
              },
              "&:hover fieldset": {
                borderColor: colors.light,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.light,
              },
            },
          }}
        />

        <FileUploadButton
          colors={colors}
          onFileChange={(file) => setFieldValue("file", file)}
        />
        {touched.file && errors.file && (
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {errors.file}
          </FormHelperText>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClickOpen}
          sx={{
            bgcolor: colors.main,
            borderRadius: "50px",
            mt: "30px",
            height: "56px",
            textTransform: "none",
            fontSize: "16px",
            fontFamily: "Montserrat",
          }}
        >
          Замовити
        </Button>
      </Box>

      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Підтвердження замовлення"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ваш тортик: {currentCake?.name}
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            Вага: {values.weight} кг
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            Ціна: {cakePrice(currentCake?.price, values.weight)} грн
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            Дата: {formattedDate}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              submitForm();
              handleClose();
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
            onClick={handleClose}
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

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
