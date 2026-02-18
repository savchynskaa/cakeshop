import { Link } from "@mui/material";
import { NavLink, useLocation } from "react-router";
import { colors } from "../../utils/colors";

export const CustomLink = ({ to, name }) => {
  const { pathname } = useLocation();
  const isActive = to === pathname;

  return (
    <Link
      component={NavLink}
      to={to}
      sx={{
        textAlign: "center",
        color: colors.main,
        textDecoration: "none",
        position: "relative",
        "&:hover": {
          color: colors.main,
          textDecoration: "none",
        },
        "&:focus": {
          color: colors.main,
          textDecoration: "none",
        },
        "&::after": isActive
          ? {
              content: '""',
              position: "absolute",
              bottom: -2,
              left: 0,
              width: "100%",
              height: "1px",
              backgroundColor: colors.main,
              borderRadius: "2px",
            }
          : {},
      }}
    >
      {name}
    </Link>
  );
};
