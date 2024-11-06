import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  username: Yup.string().max(255).required("Username is required"),
  password: Yup.string().max(255).required("Password is required"),
});

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required("First name is required"),
  lastName: Yup.string().max(255).required("Last name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string()
    .min(12, "Must be at least 12 characters")
    .max(255)
    .required("Required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});
