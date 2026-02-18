import { Box, Button, Rating, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchReviews } from "../api/fetchReviews";
import { colors } from "../utils/colors";
import { useUser } from "../utils/userContext";
import { fetchCreateReview } from "../api/fetchCreateReview";
import { snackService } from "../components/Snackbar/SnackbarUtils";
import { useReviewForm } from "../forms/useReviewForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReviewItem } from "../components/Review/Review";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const user = useUser();

  const submit = async (values, formikHelpers) => {
    try {
      const review = await fetchCreateReview(values);

      setReviews((prev) => [review.data.review, ...prev]);
      snackService.success("Відгук успішно додано!");
      formikHelpers.resetForm();
    } catch (error) {
      console.error("Помилка при створенні відгуку:", error);
      snackService.error(error.response.data.message);
    }
  };

  const getReviews = async () => {
    try {
      const reviews = await fetchReviews();

      setReviews(reviews.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { handleSubmit, handleChange, values, touched, errors } =
    useReviewForm(submit);

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Stack sx={{ px: 4 }}>
      <Box
        sx={{
          textAlign: "center",
          fontSize: "24px",
          color: colors.main,
          fontFamily: "GarciaMarquez",
          fontWeight: "bold",
          mt: "30px",
          mb: "10px",
        }}
      >
        Залишити відгук
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mx: "auto" }}
      >
        <Box sx={{ color: colors.main, fontSize: "18px" }}>Оцінка</Box>
        <Rating
          id='rating'
          name='rating'
          value={values.rating}
          onChange={handleChange}
          icon={<FontAwesomeIcon icon={faStar} color={colors.second} />}
          emptyIcon={<FontAwesomeIcon icon={regStar} color={colors.second} />}
          disabled={(user && user.role === "baker") || !user}
        />

        <TextField
          multiline
          rows={3}
          fullWidth
          id='comment'
          name='comment'
          label='Відгук'
          margin='normal'
          type='text'
          value={values.comment}
          onChange={handleChange}
          error={touched.comment && !!errors.comment}
          helperText={touched.comment && errors.comment}
          disabled={(user && user.role === "baker") || !user}
          sx={{
            "& .MuiInputLabel-root": {
              color: colors.second,
              fontFamily: "Montserrat !important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.second,
            },
            "&:hover fieldset": {
              borderColor: `${colors.second} !important`,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
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

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={(user && user.role === "baker") || !user}
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
          Залишити відгук
        </Button>
      </Box>

      <Box
        sx={{
          height: "1px",
          bgcolor: colors.main,
          width: "100%",
          display: "flex",
          alignSelf: "center",
          mt: "50px",
        }}
      ></Box>

      <Stack>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </Stack>
    </Stack>
  );
};
