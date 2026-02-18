import { Box, Rating, Stack } from "@mui/material";
import { colors } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regStar } from "@fortawesome/free-regular-svg-icons";

export const ReviewItem = ({ review }) => {
  return (
    <Stack
      sx={{
        color: colors.second,
        py: "30px",
        px: "20px",
        gap: "5px",
        borderBottom: `1px solid ${colors.main}`,
      }}
    >
      <Box>Імʼя: {review.user_name}</Box>
      <Stack direction='row' alignItems='center' gap='5px'>
        Оцінка:{" "}
        <Rating
          readOnly
          value={review.rating}
          icon={<FontAwesomeIcon icon={faStar} color={colors.second} size='xs' />}
          emptyIcon={<FontAwesomeIcon icon={regStar} color={colors.second} size='xs' />}
        />
      </Stack>
      <Box>Відгук: {review.comment}</Box>
    </Stack>
  );
};
