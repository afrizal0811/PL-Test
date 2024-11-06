import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const DialogChangePassword = ({ isModalOpen, setIsModalOpen, username }) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required(),
      password: yup.string().required(),
      confirmPassword: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DOMAIN_API}/Auth/ChangePassword`,
          { ...values, username },
          GetConfig()
        );
        if (response.status === 200 || response.status === 204) {
          setIsModalOpen(false);
          return NotifySuccess("Sukses", "Berhasil ubah password").then(() => {
            window.location.reload();
          });
        } else {
          setIsModalOpen(false);
          const errorsMessage = response.data?.errors[0]?.description ?? "";
          if (errorsMessage) {
            return NotifyError(errorsMessage);
          }
        }
      } catch (error) {
        NotifyError(error.message ?? "Something went wrong");
        setIsModalOpen(false);
        throw error;
      }
    },
  });

  const onClose = () => {
    setIsModalOpen(false);
    formik.setValues({
      username: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose} maxWidth={"sm"}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={2} paddingTop={2}>
            <Grid item xs={12}>
              <TextField
                id="oldPassword"
                label="Old Password"
                type="password"
                name="oldPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="New Password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                fullWidth
              />
            </Grid>
            <Grid container sx={{ paddingTop: 4 }} columnSpacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" fullWidth type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChangePassword;
