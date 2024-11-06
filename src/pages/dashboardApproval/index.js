import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Link, Breadcrumbs as MuiBreadcrumbs, Tab } from "@mui/material";
import { Box, spacing } from "@mui/system";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import ApprovalTable from "./ApprovalTable";
import DaftarPengajuan from "./DaftarPengajuan";
import DetailPengajuan from "./detail";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const PANEL = {
  DASHBOARD_APPROVAL: "DASHBOARD_APPROVAL",
  DAFTAR_PENGAJUAN: "DAFTAR_PENGAJUAN",
};

export default function DashboardApproval() {
  const [Panel, setPanel] = React.useState(PANEL.DASHBOARD_APPROVAL);
  const [Detail, setDetail] = React.useState("");

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("id", id);
    if (!!id && !Detail) {
      history(`/dashboard-approval`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Dashboard Approval" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private" onClick={(e) => setDetail("")}>
          Home
        </Link>
        <Link
          component={NavLink}
          to="/dashboard-approval"
          onClick={(e) => setDetail("")}
        >
          Dashboard Approval
        </Link>
      </Breadcrumbs>
      {!!Detail ? (
        <>
          <DetailPengajuan Detail={Detail} setDetail={(e) => setDetail(e)} />
        </>
      ) : (
        <Grid container mt={0}>
          <Grid item xs={12}>
            <TabContext value={Panel}>
              <Box>
                <TabList
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={(event, newValue) => {
                    setPanel(newValue);
                  }}
                >
                  <Tab
                    label="Dashboard"
                    value={PANEL.DASHBOARD_APPROVAL}
                    style={{
                      color:
                        Panel === PANEL.DASHBOARD_APPROVAL
                          ? "white"
                          : "#a7d2f0",
                      background: "#0078d2",
                    }}
                  />
                  <Tab
                    label="Daftar"
                    value={PANEL.DAFTAR_PENGAJUAN}
                    style={{
                      color:
                        Panel === PANEL.DAFTAR_PENGAJUAN ? "white" : "#a7d2f0",
                      background: "#0078d2",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value={PANEL.DASHBOARD_APPROVAL}>
                <ApprovalTable setDetail={(e) => setDetail(e)} />
              </TabPanel>
              <TabPanel value={PANEL.DAFTAR_PENGAJUAN}>
                <DaftarPengajuan setDetail={(e) => setDetail(e)} />
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
