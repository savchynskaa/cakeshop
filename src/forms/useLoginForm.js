import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Неправильний email")
    .required("Це поле не може бути пустим"),
  password: Yup.string()
    .min(6, "Мінімально 6 символів")
    .required("Це поле не може бути пустим"),
});

export const useLoginForm = (submitValue) => {
  return useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      submitValue(values);
    },
  });
};
