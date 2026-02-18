import { Box, ImageList, ImageListItem, Stack } from "@mui/material";
import { colors } from "../utils/colors";
import { CircleNumber } from "../components/CircleNumber/CircleNumber";

export const Main = () => {
  return (
    <Stack marginTop="-99px">
      <Box
        sx={{
          display: "flex",
          backgroundImage: `url(/mainImage.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "715px",
          flexDirection: "column",
          justifyContent: "flex-end",
          pl: "78px",
          pb: "100px",
        }}
      >
        <Box
          sx={{
            fontFamily: "GarciaMarquez",
            fontSize: "108px",
            color: colors.main,
          }}
        >
          Cake Shop
        </Box>

        <Box
          sx={{
            color: colors.second,
            mt: "-40px",
            fontSize: "24px",
          }}
        >
          Ніжність. Смак. Натхнення.
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          color: colors.main,
          fontWeight: "bold",
          position: "relative",
          textAlign: "center",
          width: "fit-content",
          marginY: "70px",
          fontSize: "24px",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -5,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "1px",
            backgroundColor: colors.main,
            borderRadius: "2px",
          },
        }}
      >
        Зробимо тортик за вашим побажанням
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: "4px" }}>
        {/* Column 1 */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <img
            src="/Ph3.jpg"
            alt="ph3"
            style={{ width: "320px", height: "442px" }}
          />
        </Box>

        {/* Column 2 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <img
            src="/Ph2.jpg"
            alt="ph2"
            style={{ width: "194px", height: "180px" }}
          />
          <img
            src="/Ph5.jpg"
            alt="ph5"
            style={{ width: "194px", height: "254px" }}
          />
        </Box>

        {/* Column 3 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <img
            src="/Ph6.jpg"
            alt="ph6"
            style={{ width: "190px", height: "auto" }}
          />
          <img
            src="/Ph4.jpg"
            alt="ph4"
            style={{ width: "190px", height: "201px" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "column",
          marginY: "70px",
          gap: "10px",
          fontSize: "24px",
          maxWidth: "800px",
          color: colors.second,
        }}
      >
        <Box
          sx={{
            fontFamily: "GarciaMarquez",
            fontSize: "32px",
          }}
        >
          Про нас
        </Box>

        <Box textAlign="center">
          Ми — сучасна онлайн-кондитерська, що спеціалізується на виготовленні
          індивідуальних тортів на замовлення.{" "}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
            color: colors.main,
            fontWeight: "bold",
            position: "relative",
            textAlign: "center",
            width: "fit-content",
            fontFamily: "GarciaMarquez",
            fontSize: "32px",
            mt: "15px",
            "&::before": {
              content: '""',
              position: "absolute",
              left: "50%",
              top: -10,
              transform: "translateX(-50%)",
              width: "150%",
              height: "2px",
              backgroundColor: colors.main,
              borderRadius: "2px",
            },
          }}
        >
          Cake Shop
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: colors.main,
          display: "flex",
          gap: "100px",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
        }}
      >
        <img
          src="/Ph8.jpg"
          alt="ph8"
          style={{
            height: "350px",
            width: "250px",
          }}
        />

        <Box fontSize="32px" color="white">
          <Box
            sx={{
              fontWeight: "bold",
            }}
          >
            Що ми пропонуємо:
          </Box>

          <Box
            component="ul"
            display="flex"
            flexDirection="column"
            gap="50px"
            mt="50px"
          >
            <li>Торти будь-якої складності</li>
            <li>Натуральні інгредієнти</li>
            <li>Індивідуальний підхід</li>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          mt: "150px",
          fontSize: "32px",
          color: colors.main,
        }}
      >
        <Box
          sx={{
            fontFamily: "GarciaMarquez",
            textAlign: "center",
            mb: "50px",
          }}
        >
          Як ми працюємо
        </Box>

        <Stack direction="row" gap="60px">
          <Stack textAlign="start" gap="60px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="20px"
            >
              <CircleNumber number="1" />
              <Box maxWidth="300px">Ви обираєте торт із каталогу</Box>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="20px"
            >
              <CircleNumber number="2" />
              <Box maxWidth="300px">Вказуєте розмір, деталі та дизайн</Box>
            </Stack>
          </Stack>

          <Stack textAlign="start" gap="60px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="start"
              gap="20px"
            >
              <CircleNumber number="3" />
              <Box maxWidth="300px">Ми готуємо торт напередодні</Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="20px"
            >
              <CircleNumber number="4" />
              <Box maxWidth="350px">Ви отримуєте смачний витвір мистецтва</Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
