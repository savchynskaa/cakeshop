import { Box, Stack } from "@mui/material";
import { colors } from "../../utils/colors";

export const Footer = () => {
  return (
    <Stack
      sx={{
        padding: "50px 65px",
        bgcolor: colors.main,
        mt: "150px",
        color: "white",
        fontSize: "24px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <Stack>
        <Box
          sx={{
            fontFamily: "GarciaMarquez",
            fontSize: "32px",
            mb: "30px",
          }}
        >
          Cake Shop
        </Box>
        <Box mb="20px">Графік роботи:</Box>
        <Box>Пн–Сб: 09:00–19:00</Box>
        <Box>Нд: 09:00–15:00</Box>
      </Stack>

      <Stack gap="20px">
        <Box>Де нас знайти:</Box>
        <Box
          component="a"
          href="https://www.google.com/maps?q=м.+Київ,+вул.+Солодка,+12"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          м. Київ — вул. Солодка, 12
        </Box>

        <Box
          component="a"
          href="https://www.google.com/maps?q=м.+Львів,+просп.+Десертний,+8"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          м. Львів — просп. Десертний, 8
        </Box>
      </Stack>

      <Stack gap="20px">
        <Box>Контакти:</Box>
        <Stack>
          <Box
            component="a"
            href="tel:+380961234567"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            +38 (096) 123-45-67
          </Box>
          <Box
            component="a"
            href="mailto:kyiv@cakeshop.ua"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            kyiv@cakeshop.ua
          </Box>
        </Stack>

        <Stack>
          <Box
            component="a"
            href="tel:+380977654321"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            +38 (097) 765-43-21
          </Box>
          <Box
            component="a"
            href="mailto:lviv@cakeshop.ua"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            lviv@cakeshop.ua
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
