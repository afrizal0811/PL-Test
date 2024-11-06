import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Detail from "./Detail";

import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import { GetConfig } from "../../../../utils/ConfigHeader";

const TextField = styled(MuiTextField)(spacing);

function Header() {
  const [Data, setData] = useState([]);
  const [ScreenID, setScreenID] = useState("");
  const [description, setDescription] = useState("");
  const [departement, setDeparatement] = useState("");
  const [branchApproval, setBranchApproval] = useState("");
  const [status, setStatus] = useState(false);
  const mounted = useRef();
  const history = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getData();
    }
  }, [id]);

  const getData = () => {
    setLoading(true);
    try {
      axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/MasterApproval/" + id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            setScreenID([
              {
                ScreenID: resdata.ScreenID,
                Description: resdata.screenDesc,
              },
            ]);
            setBranchApproval(resdata.BranchID);
            setDeparatement([
              {
                DepartmentID: resdata.DepartmentID,
                Description: resdata.DepartmentDesc,
              },
            ]);
            setDescription(resdata.Description);
            setStatus(resdata.Status);
            const newres = [];
            Object.keys(resdata.MasterApprovalLineRep).forEach(function (key) {
              newres.push({
                id: key,
                levelling: resdata.MasterApprovalLineRep[key].Levelling,
                employeeID: resdata.MasterApprovalLineRep[key].EmployeeID,
                employeeName: resdata.MasterApprovalLineRep[key].EmployeeName,
                salespersonID: resdata.MasterApprovalLineRep[key].SalespersonID,
                actionList: resdata.MasterApprovalLineRep[key].ActionList,
                limit1: resdata.MasterApprovalLineRep[key].Limit1,
                limit2: resdata.MasterApprovalLineRep[key].Limit2,
                operatorLimit: resdata.MasterApprovalLineRep[key].OperatorLimit,
                operatorTOP: resdata.MasterApprovalLineRep[key].OperatorTOP,
                toP1: resdata.MasterApprovalLineRep[key].TOP1,
                toP2: resdata.MasterApprovalLineRep[key].TOP2,
                tipe1: resdata.MasterApprovalLineRep[key].Tipe1,
                branchID:
                  resdata.MasterApprovalLineRep[key].BrnchID ??
                  resdata.BranchID,
                MasterApprovalRepTransaksiID:
                  resdata.MasterApprovalLineRep[key]
                    .MasterApprovalRepTransaksiID,
              });
            });
            setData(newres);
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
      let arr = Data.map(
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
          branchID,
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
          brnchId: branchID,
        })
      );
      const payload = {
        ScreenID: ScreenID[0].ScreenID,
        departmentID: departement[0].DepartmentID,
        departmentDesc: departement[0].DepartmentDesc,
        screenDesc: ScreenID[0].screenDesc,
        branchID: branchApproval,
        status: status,
        description: description,
        masterApprovalLineRep: arr,
      };
      console.log(payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/MasterApproval/" +
            "UpdateMasterApproval",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (
            response.status == 200 ||
            response.status == 201 ||
            response.status == 204
          ) {
            NotifySuccess("success", "Data Telah DiUbah");
            // getData();
            setTimeout(() => {
              history(`/master-data/approval/${ScreenID[0].ScreenID}`);
              window.location.reload();
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

  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        deleteData(id);
      }
    });
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}` + "/MasterApproval/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            history("/master-data/approval");
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
          // disabled={TransaksiID === "" || branch === "" || departement === ""}
          disabled={
            ScreenID === "" || branchApproval === "" || departement === ""
          }
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
          onClick={() => notifyConfirm(id)}
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
              <TextField
                name="ScreenID"
                label="ScreenID"
                value={ScreenID !== "" ? ScreenID[0].ScreenID : ""}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
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
                // config={GetConfig()}
                // disabled={Loading}
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
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="outlined"
                // my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item md={3} xs={6}>
              <CbBranch
                required
                defaultValue={branch}
                value={branch}
                onChange={(newValue) => {
                  setBranch(newValue);
                  // console.log(menuID);
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
          Detail={Data}
          TransaksiID={ScreenID}
          description={description}
          departement={departement}
          setDeparatement={setDeparatement}
          branchApproval={branchApproval}
          setBranchApproval={setBranchApproval}
          status={status}
          setData={setData}
        />
      </Card>
    </>
  );
}

export default Header;
