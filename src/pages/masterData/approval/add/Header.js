import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Detail from "./Detail";
// import { useParams } from "react-router-dom";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Card as MuiCard,
  TextField as MuiTextField,
} from "@mui/material";
import CbData from "../../../../components/shared/dropdown";

import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { GetConfig } from "../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

function Header() {
  const [ScreenID, setScreenID] = useState("");
  const [description, setDescription] = useState("");
  const [departement, setDeparatement] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState(false);
  const { id } = useParams();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (ScreenID != "") {
      getData(ScreenID[0].ScreenID);
      console.log("scre", ScreenID);
    }
  }, [ScreenID]);

  const getData = (id) => {
    setLoading(true);
    try {
      axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/MasterApproval/" + id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            history(`/master-data/approval/${id}`);
            // window.location.reload();
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let arr = data.map(
        ({
          // MasterApprovalRepScreenID,
          employeeID,
          employeeName,
          levelling,
          salespersonID,
          tipe1,
          actionList,
          operatorLimit,
          limit1,
          limit2,
          operatorTOP,
          toP1,
          toP2,
        }) => ({
          MasterApprovalRepScreenID: ScreenID,
          employeeID: employeeID.toString(),
          employeeName: employeeName.toString(),
          levelling,
          salespersonID,
          tipe1,
          actionList,
          operatorLimit,
          limit1,
          limit2,
          operatorTOP,
          toP1,
          toP2,
        })
      );
      const payload = {
        ScreenID: ScreenID[0].ScreenID,
        departmentID: departement[0].DepartmentID,
        departmentDesc: departement[0].DepartmentDesc,
        screenDesc: ScreenID[0].screenDesc,
        branchID: branch,
        status: status,
        description: description,
        masterApprovalLineRep: arr,
      };
      console.log("ini datakuu", data);
      console.log(payload);

      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/MasterApproval/CreateMasterApproval",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/master-data/approval/${ScreenID[0].ScreenID}`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container my={3} py={1}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/master-data/approval")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          // disabled={ScreenID === "" || branch === "" || departement === ""}
          // disabled={Loading}
          onClick={() => handleSave()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => {
            history("/master-data/add-approval");
            window.location.reload();
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={!id}
          // onClick={onSumbitHandler}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={3} md={12} mt={1}>
            <Grid item md={3} xs={6}>
              {/* <CbData
                required
                // all
                source={`${process.env.REACT_APP_DOMAIN_API}/ScreenNoReps/DropDown/ScreenNo`}
                id={"ScreenID"}
                desc={"Description"}
                label="Screen ID"
                onChange={(newValue) => {
                  setScreenID(newValue);
                  // console.log(ScreenID);
                }}
              /> */}
              <CbData
                value={ScreenID == "" ? " " : `${ScreenID[0].ScreenID}`}
                defaultValue={ScreenID == "" ? " " : `${ScreenID[0].ScreenID}`}
                required
                // config={GetConfig()}
                // disabled={Loading}
                label="ScreenID"
                desc={"Description"}
                all
                source={`${process.env.REACT_APP_DOMAIN_API}/ScreenNoReps/DropDown/ScreenNo`}
                id="ScreenID"
                onChange={(e) => {
                  setScreenID(e);
                  console.log("e", e);
                }}
              />
            </Grid>
            {/* <Grid item md={3} xs={6}>
              <CbData
                value={
                  departement == "" ? " " : `${departement[0].DepartmentID}`
                }
                defaultValue={
                  departement == "" ? " " : `${departement[0].DepartmentID}`
                }
                required
                label="Departement"
                all
                source={`${process.env.REACT_APP_DOMAIN_API}/DepartmentsReps/DropDown/Department`}
                id="DepartmentID"
                desc="Description"
                onChange={(e) => {
                  setDeparatement(e);
                  // console.log("e", e);
                }}
              />
            </Grid> */}
            <Grid item md={3} xs={6}>
              <TextField
                name="description"
                label="Description"
                value={description}
                fullWidth
                variant="outlined"
                disabled={false}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item md={3} xs={6}>
              <CbBranch
                required
                onChange={(newValue) => {
                  setBranch(newValue);
                  // console.log(ScreenID);
                }}
              />
            </Grid> */}
            <Grid item md={6} xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    name="gilad"
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Detail
          ScreenID={ScreenID}
          description={description}
          departement={departement}
          setDeparatement={(e) => setDeparatement(e)}
          branch={branch}
          setBranch={(e) => setBranch(e)}
          status={status}
          setData={(e) => setData(e)}
          data={data}
        />
      </Card>
    </>
  );
}

export default Header;
