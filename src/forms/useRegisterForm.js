import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[А-Яа-яІіЇїЄєA-Za-z\s'-]+$/,
      "Це поле не може містити цифри або спеціальні знаки"
    )
    .min(4, "Мінімально 4 символа")
    .required("Це поле не може бути пустим"),
  phone: Yup.string()
    .matches(
      /^\+380\s\d{2}\s\d{3}\s\d{4}$/,
      "Введіть повний номер у форматі: +380 XX XXX XXXX"
    )
    .required("Це поле не може бути пустим"),
  email: Yup.string()
    .email("Неправильний email")
    .required("Це поле не може бути пустим"),
  password: Yup.string()
    .min(6, "Мінімально 6 символів")
    .required("Це поле не може бути пустим"),
});

export const useRegisterForm = (submitValue) => {
  return useFormik({
    initialValues: { email: "", password: "", name: "", phone: "" },
    validationSchema,
    onSubmit: (values) => {
      submitValue(values);
    },
  });
};
