import { Stack } from "@mui/material";
import { colors } from "../../utils/colors";

export const CircleNumber = ({ number }) => {
  return (
    <Stack
      bgcolor={colors.second}
      sx={{
        color: "white",
        fontFamily: "GarciaMarquez",
        fontSize: "42px",
        justifyContent: "center",
        alignItems: "center",
        width: "82px",
        height: "82px",
        borderRadius: "50%",
        pt: "7px",
      }}
    >
      {number}
    </Stack>
  );
};
