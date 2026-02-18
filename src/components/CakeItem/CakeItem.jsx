import { Box, Button, Stack } from "@mui/material";
import { colors } from "../../utils/colors";
import { useUser } from "../../utils/userContext";

export const CakeItem = ({ id, img, name, details, price, description }) => {
  const user = useUser();

  return (
    <>
      <Stack direction='row' gap='30px' color={colors.second}>
        <img
          src={img}
          alt='cakeImage'
          style={{
            width: "300px",
            height: "300px",
          }}
        />

        <Stack gap='8px'>
          <Box
            sx={{
              fontSize: "24px",
              fontFamily: "GarciaMarquez",
              color: colors.main,
            }}
          >
            {name}
          </Box>

          <Box maxWidth='350px' letterSpacing='1.5px'>
            {description}
          </Box>

          <Box fontWeight='bold'>
            Склад:
            <Box
              component='div'
              mt='5px'
              fontWeight='normal'
              dangerouslySetInnerHTML={{ __html: details }}
            />
          </Box>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box fontSize='24px'>
              {Number(price) ? Number(price).toFixed() : "0"} грн/кг
            </Box>

            <Button
              href={user ? `/order-form/${id}` : "/login"}
              variant='contained'
              sx={{
                bgcolor: colors.second,
                borderRadius: "50px",
                textTransform: "none",
                fontFamily: "Montserrat",
                "&:active": {
                  bgcolor: colors.main,
                },
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Замовити
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
    </>
  );
};
