import React, { useEffect, useMemo, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Button, FormControl, Grid, Tab, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import TabGeneral from "./TabGeneral";
import TabDriver from "./TabDriver";
import TabZona from "./TabZona";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  NotifyError,
  NotifySuccess,
} from "../../../../services/notification.service";
import axios from "axios";
import CbEmployee from "../../../../../components/shared/cbEmployee";
import CbZona from "../../../../../components/shared/cbZona";

// Tabs.propTypes = {
//   General: PropTypes.any,
//   Driver: PropTypes.any,
//   KapasitasWeight: PropTypes.any,
//   setKapasitasWeight: PropTypes.func,
//   TanggalKIR: PropTypes.any,
//   setTanggalKIR: PropTypes.func,
// };

export default function Tabs(props) {
  const [tabPanel, setTabPanel] = useState("1");
  const [loading, setLoading] = useState(props.Loading);
  // const [TanggalKIR, setTanggalKIR] = useState(props?.General?.TanggalKIR);
  // const [BeratKendaraan, setBeratKendaraan] = useState(
  //   props?.General?.BeratKendaraan
  // );
  // const [KapasitasWeight, setKapasitasWeight] = useState(
  //   props?.General?.KapasitasWeight
  // );
  // const [KapasitasVolume, setKapasitasVolume] = useState(
  //   props?.General?.KapasitasVolume
  // );
  // const [TanggalSTNK, setTanggalSTNK] = useState(props?.General?.TanggalSTNK);
  // const [TanggalPembuatan, setTanggalPembuatan] = useState(
  //   props?.General?.TahunPembuatan
  // );
  // const [TipeStorage, setTipeStorage] = useState(props?.General?.TipeStorage);
  // const [AssetID, setAssetID] = useState(props?.General?.AssetID);

  // const [isEditingDriver, setisEditingDriver] = useState(false);
  // const [Driver, setDriver] = useState(props?.Driver);
  // const [Zona, setZona] = useState(props?.Zona);

  // const [dataZona, setDataZona] = useState([]);
  // const [counterZona, setcounterZona] = useState(dataZona.length + 1);
  // const [isEditingZona, setisEditingZona] = useState(false);
  // const [IsNewZona, setIsNewZona] = useState(true);
  // const [ZonaTemp, setZonaTemp] = useState([]);

  useEffect(() => {
    // setTanggalKIR(props?.TanggalKIR);
    // setBeratKendaraan(props?.BeratKendaraan);
    // setKapasitasWeight(props?.KapasitasWeight);
    // setKapasitasVolume(props?.KapasitasVolume);
    // setTanggalSTNK(props?.TanggalSTNK);
    // setTipeStorage(props?.TipeStorage);
    // setAssetID(props?.AssetID);
    // setTanggalPembuatan(props?.TahunPembuatan);
    // setDriver(props?.Driver);
    // setZona(props?.Zona);
    setLoading(props.Loading);
  }, [props]);

  const handleChangeTab = (event, newValue) => {
    setTabPanel(newValue);
  };

  return (
    <>
      <div style={{ border: "1px solid #0078d2", margin: "14px", flexGrow: 1 }}>
        <TabContext value={tabPanel}>
          <AppBar
            position="static"
            style={{ background: "#0078d2", color: "white" }}
          >
            <TabList
              onChange={handleChangeTab}
              aria-label="simple tabs example"
              style={{ color: "white" }}
            >
              <Tab
                label="General"
                value="1"
                style={{ color: tabPanel == 1 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Driver"
                value="2"
                style={{ color: tabPanel == 2 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Shipping Zone"
                value="3"
                style={{ color: tabPanel == 3 ? "white" : "#a7d2f0" }}
              />
            </TabList>
          </AppBar>
          <TabGeneral
            TanggalKIR={props.TanggalKIR}
            setTanggalKIR={(e) => props.setTanggalKIR(e)}
            BeratKendaraan={props.BeratKendaraan}
            setBeratKendaraan={(e) => props.setBeratKendaraan(e)}
            KapasitasWeight={props.KapasitasWeight}
            setKapasitasWeight={(e) => props.setKapasitasWeight(e)}
            KapasitasVolume={props.KapasitasVolume}
            setKapasitasVolume={(e) => props.setKapasitasVolume(e)}
            TanggalSTNK={props.TanggalSTNK}
            setTanggalSTNK={(e) => props.setTanggalSTNK(e)}
            TanggalPembuatan={props.TanggalPembuatan}
            setTanggalPembuatan={(e) => props.setTanggalPembuatan(e)}
            TipeStorage={props.TipeStorage}
            setTipeStorage={(e) => props.setTipeStorage(e)}
            AssetID={props.AssetID}
            setAssetID={(e) => props.setAssetID(e)}
          />
          <TabDriver
            // refDriver={props.refDriver}
            // columnsDrivers={props.columnsDrivers}
            StatusMilik={props.StatusMilik}
            Driver={props.Driver}
            setDriver={(e) => props.setDriver(e)}
            isEditingDriver={props.isEditingDriver}
            setisEditingDriver={props.setisEditingDriver}
            // setIsNewDriver={props.setIsNewDriver}
            // handleRowEditStart={handleRowEditStart}
            // handleRowEditStop={handleRowEditStop}
            // handleCellFocusOut={handleCellFocusOut}
          />
          <TabZona
            Zona={props.Zona}
            setZona={(e) => props.setZona(e)}
            isEditingZona={props.isEditingZona}
            setisEditingZona={props.setisEditingZona}
          />
        </TabContext>
      </div>
      <Grid
        container
        spacing={6}
        md={12}
        mt={3}
        paddingLeft={8}
        paddingBottom={5}
      >
        {/* <Button
          mr={2}
          ml={4}
          variant="contained"
          color="warning"
          startIcon={<SaveIcon />}
          onClick={handletes}
        >
          Refresh
        </Button> */}
        {/* <Button
          mr={2}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handletes}
        >
          tes
        </Button> */}
      </Grid>
    </>
  );
}
