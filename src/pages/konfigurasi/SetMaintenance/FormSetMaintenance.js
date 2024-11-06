import {
  Box,
  Button,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Card as MuiCard,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";

import React from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const API_URL = process.env.REACT_APP_DOMAIN_API;

const Card = styled(MuiCard)(spacing);

const getSetupMaintenance = async () => {
  try {
    const response = await axios.get(API_URL + "/SetupBackends/isMaintenance");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const FormSetMaintenance = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      isMaintenance: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.put(
          API_URL + "/SetupBackends/isMaintenance",
          {
            setupKey: "isMaintenance",
            value: values.isMaintenance,
          },
          GetConfig()
        );
        NotifySuccess("Success", "success update maintenance").then(() =>
          window.location.reload()
        );
      } catch (error) {
        NotifyError("There was an error!", error.message);
      }
      setSubmitting(false);
    },
  });

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const isMaintenance = (await getSetupMaintenance()).value;
        setIsLoading(false);
        formik.setFieldValue("isMaintenance", isMaintenance);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Card>
      <CardContent>
        <Container maxWidth="sm">
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel sx={{ fontSize: 16 }}>Is Maintenance</FormLabel>
                <RadioGroup
                  name="isMaintenance"
                  value={formik.values.isMaintenance}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value={"true"}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={"false"}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting || isLoading}
                >
                  Save
                </Button>
              </Box>
            </Stack>
          </form>
        </Container>
      </CardContent>
    </Card>
  );
};

export default FormSetMaintenance;
