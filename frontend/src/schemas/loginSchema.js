import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default loginSchema;
