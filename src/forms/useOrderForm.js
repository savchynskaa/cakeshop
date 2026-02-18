import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  cake: Yup.string().required("Це поле не може бути пустим"),
  weight: Yup.string().required("Це поле не може бути пустим"),
  notes: Yup.string(),
  file: Yup.mixed()
    .required("Файл обов’язковий")
    .test("fileSize", "Файл завеликий", (value) => {
      return value && value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Недопустимий тип файлу", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
      );
    }),
  date: Yup.date().required("Оберіть дату та час"),
});

export const useOrderForm = (submitValue) => {
  return useFormik({
    initialValues: { cake: "", weight: "", notes: "", file: null, date: "" },
    validationSchema,
    onSubmit: (values) => {
      submitValue(values);
    },
  });
};
