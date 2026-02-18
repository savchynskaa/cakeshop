import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useLoginForm } from "../forms/useLoginForm";
import { colors } from "../utils/colors";
import { Link } from "react-router";
import { HeaderButton } from "../components/HeaderButton/HeaderButton";
import { fetchLogin } from "../api/fetchLogin";
import Cookies from "js-cookie";
import { snackService } from "../components/Snackbar/SnackbarUtils";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const submit = async (values) => {
    try {
      const data = await fetchLogin(values);
      Cookies.set("token", data.data.token, { expires: 1 });

      Cookies.set("user", JSON.stringify(data.data.user), { expires: 1 });

      window.location.replace("/");
    } catch (error) {
      console.error("Помилка при логіні:", error);
      snackService.error(error.response.data.message);
    }
  };

  const { handleSubmit, handleChange, values, touched, errors } =
    useLoginForm(submit);

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
        Увійдіть
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mx: "auto" }}
      >
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email'
          margin='normal'
          type='email'
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
          id='password'
          name='password'
          label='Пароль'
          type={isShowPassword ? "text" : "password"}
          margin='normal'
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
              <InputAdornment position='end'>
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
          type='submit'
          variant='contained'
          color='primary'
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
          Увійти
        </Button>
      </Box>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        mt='10px'
        gap='10px'
      >
        <Box
          sx={{
            color: colors.second,
            fontSize: "18px",
          }}
        >
          Немає облікового запису?
        </Box>

        <Link to='/register' style={{ color: colors.main }}>
          Зареєструватись
        </Link>
      </Stack>
    </>
  );
};
