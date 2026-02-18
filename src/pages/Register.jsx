import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useRegisterForm } from "../forms/useRegisterForm";
import { colors } from "../utils/colors";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { HeaderButton } from "../components/HeaderButton/HeaderButton";
import { MuiTelInput } from "mui-tel-input";
import { fetchRegister } from "../api/fetchRegister";
import { snackService } from "../components/Snackbar/SnackbarUtils";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const submit = async (values) => {
    setLoading(true);

    try {
      await fetchRegister(values);

      setLoading(false);
      snackService.success("Реєстрація успішна!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      snackService.error(error.response.data.message);
      setLoading(false);
    }
  };

  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } =
    useRegisterForm(submit);

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
        Створіть акаунт
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mx: "auto" }}
      >
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Імʼя"
          margin="normal"
          value={values.name}
          onChange={handleChange}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          sx={{
            "& .MuiInputLabel-root": {
              color: colors.second,
              fontFamily: "Montserrat !important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.second,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
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

        <MuiTelInput
          forceCallingCode
          id="phone"
          name="phone"
          value={values.phone}
          onChange={(value) => setFieldValue("phone", value)}
          fullWidth
          focusOnSelectCountry
          langOfCountryName="ua"
          defaultCountry="UA"
          onlyCountries={["UA"]}
          helperText={touched.phone && errors.phone}
          error={touched.phone && !!errors.phone}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: "300px",
              },
            },
          }}
          sx={{
            bgcolor: "#fff",
            mt: "10px",
            "& .MuiInputBase-root": {
              borderRadius: "50px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${colors.light} !important`,
            },
            "& input": {
              fontFamily: "Montserrat",
            },
          }}
        />

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{
            "& .MuiInputLabel-root": {
              color: colors.second,
              fontFamily: "Montserrat !important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.second,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
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

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          type={isShowPassword ? "text" : "password"}
          margin="normal"
          value={values.password}
          onChange={handleChange}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          sx={{
            "& .MuiInputLabel-root": {
              color: colors.second,
              fontFamily: "Montserrat !important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.second,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsShowPassword(!isShowPassword)}>
                  <FontAwesomeIcon
                    icon={isShowPassword ? faEye : faEyeSlash}
                    style={{ width: 16, height: 16 }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
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
          Зареєструватись
        </Button>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        mt="10px"
        gap="10px"
      >
        <Box
          sx={{
            color: colors.second,
            fontSize: "18px",
          }}
        >
          Є обліковий запис?
        </Box>

        <Link to="/login" style={{ color: colors.main }}>
          Увійти
        </Link>
      </Stack>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
