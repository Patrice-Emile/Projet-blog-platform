import * as yup from "yup";

export const yupSchema = yup.object().shape({
  name: yup.string().trim().min(2),
  email: yup.string().trim().email(),
  password: yup
    .string()
    .min(8)
    .max(50)
    .matches(/[^A-Za-z0-9]/, "password must contain a special character")
    .matches(/[A-Z]/, "password must contain an uppercase letter")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[0-9]/, "password must contain a number"),
  confirmPassword: yup
    .string()
    .min(8)
    .max(50)
    .matches(
      /[^A-Za-z0-9]/,
      "Confirm Password must contain a special character"
    )
    .matches(/[A-Z]/, "Confirm Password must contain an uppercase letter")
    .matches(/[a-z]/, "Confirm Password must contain a lowercase letter")
    .matches(/[0-9]/, "Confirm Password must contain a number"),
  content: yup.string().trim(),
  is_published: yup.boolean(),
  id: yup.number(),
});
// export default yupSchema;
