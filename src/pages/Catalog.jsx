import { Backdrop, Box, CircularProgress, Grid, Stack } from "@mui/material";
import { colors } from "../utils/colors";
import { CakeItem } from "../components/CakeItem/CakeItem";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCakeTypes } from "../api/fetchCakeTypes";

export const Catalog = () => {
  const [loading, setLoading] = useState(true);
  const [cakeTypes, setCakeTypes] = useState([]);

  const getCakeTypes = async () => {
    try {
      const cakeTypes = await fetchCakeTypes();

      setCakeTypes(cakeTypes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCakeTypes();
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
        Торти
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
        {cakeTypes.map((cake) => (
          <CakeItem
            key={cake.id}
            id={cake.id}
            name={cake.name}
            description={cake.description}
            details={cake.details}
            price={cake.price}
            img={cake.image_url}
          />
        ))}
      </Stack>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
};
