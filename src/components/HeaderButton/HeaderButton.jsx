import { Box } from "@mui/material";
import { Link } from "react-router";
import { colors } from "../../utils/colors";

export const HeaderButton = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        fontFamily: "GarciaMarquez",
        fontSize: "32px",
        display: "block",
        padding: "33px 35px",
        textDecoration: "underline",
        color: colors.main,
        "&:hover": {
          color: colors.main,
        },
      }}
    >
      Cake Shop
    </Box>
  );
};
