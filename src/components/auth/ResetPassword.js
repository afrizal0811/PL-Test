import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import useAuth from "../../modules/Auth/hooks/useAuth";
import { resetPasswordSchema } from "../../modules/Auth/utils/schema";
import Swal from "sweetalert2";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        submit: false,
      }}
      validationSchema={resetPasswordSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await resetPassword(values.email);
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Password telah dikirim ke email anda.",
          }).then(() => {
            navigate("/auth/sign-in");
          });
        } catch (error) {
          const message = error.message || "Something went wrong";
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={1} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Reset password
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default ResetPassword;
