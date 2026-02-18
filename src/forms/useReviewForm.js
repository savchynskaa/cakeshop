import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  comment: Yup.string().required("Це поле не може бути пустим"),
  rating: Yup.number()
    .min(1, "Мінімальна оцінка 1")
    .required("Це поле не може бути пустим"),
});

export const useReviewForm = (onSubmit) => {
  return useFormik({
    initialValues: { comment: "", rating: 1 },
    validationSchema,
    onSubmit: (values, formikHelpers) => onSubmit(values, formikHelpers),
  });
};
