import React from "react";
import InputFields from "./InputFields";
import RefreshButton from "./RefreshButton";
import { TabPanel } from "@material-ui/lab";
import { Button, Card, CardContent, Grid, TextField } from "@material-ui/core";

export default function TabOtherInformation(props) {
  return (
    <TabPanel value="3">
      <div>
        <Card mb={3}>
          <CardContent>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("DataOther", props.DataOther);
              }}
            >
              tes
            </Button> */}
            <Grid container spacing={8} md={8}>
              <Grid item md={6}>
                <TextField
                  label="Receipt Acumatica Nbr"
                  fullWidth
                  value={props.DataOther?.ReceiptNbr}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Issue Acumatica Nbr"
                  value={props.DataOther?.IssueNbr}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </TabPanel>
  );
}
