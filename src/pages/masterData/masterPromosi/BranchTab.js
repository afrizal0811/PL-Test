import { spacing } from "@material-ui/system";
import { Card, Grid, TextField as MuiTextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";

const TextField = styled(MuiTextField)(spacing);

const columnsPrincipal = [
  {
    field: "BranchID",
    headerName: "Branch ID",
    width: 200,
  },
  {
    field: "BranchName",
    headerName: "Branch Name",
    width: 200,
  },
];

function BranchTab(props) {
  const [loading, setLoading] = useState(false);
  const [Branch, setBranch] = useState("");
  // const [openModal, setOpenModal] = React.useState(false);

  //state function
  const [DataPincipal, setDataPincipal] = useState([]);
  const [TempPincipal, setTempPincipal] = React.useState([]);
  const [SelectedPrincipal, setSelectedPrincipal] = React.useState(() =>
    DataPincipal.filter((el) => {
      props.Branch.includes(el.BranchID);
    })
  );

  useEffect(() => {
    getDataPrincipal();
  }, []);

  useEffect(() => {
    if (props.Branch?.length > 0) {
      // let branchfil = props.Branch.filter((e) => e.isLinked == true);
      const arr = DataPincipal.filter((el) => {
        return props.Branch.some((f) => {
          return f.branchID === el.BranchID && f.isLinked == true;
        });
      });
      console.log("effect", arr);
      setTempPincipal();
      setSelectedPrincipal(
        arr.map((a) => {
          return a.BranchID;
        })
      );
    }
    // let arr = DataPincipal.filter((i) => props.Branch.includes(i.BranchID));
    // console.log("effect", props.Branch);
    // setTempPincipal(arr);
    // setSelectedPrincipal(
    //   arr.map((a) => {
    //     return a.BranchID;
    //   })
    // );
  }, [DataPincipal, props.Branch]);

  const getDataPrincipal = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/BranchReps/Dropdown/Branch",
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            setDataPincipal(response.data);
            // setDataPincipal(response.data);
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

  return (
    <Card>
      <Grid container spacing={3} md={12} mt={2} px={3}>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={DataPincipal}
            getRowId={(row) => row.BranchID}
            columns={columnsPrincipal}
            hideFooter={true}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={SelectedPrincipal}
            onSelectionModelChange={(e) => {
              setSelectedPrincipal(e);
              const selectedIDs = new Array(e);
              const selectedRows = DataPincipal.filter((r) => {
                if (selectedIDs[0]?.includes(r.BranchID)) {
                  r.isLinked = true;
                  r.branchID = r.BranchID;
                } else {
                  r.isLinked = false;
                  r.branchID = r.BranchID;
                }
                return r;
              });
              // selectedRows.map((item, i) => {
              //   item.isLinked = true;
              //   item.branchID = item.BranchID;
              //   return item;
              // });
              console.log("selectred", selectedRows);
              console.log("select ids", selectedIDs);
              props.setBranch(selectedRows);
              // setFilterPrincipal(selectedRows);
            }}
            // onRowDoubleClick={() => {
            //   props.setOpenModal(false);
            //   props.setBranch(SelectedPrincipal.toString());
            // }}
            // selectionModel={SelectedPrincipal}
            // onSelectionModelChange={(e) => {
            //   setSelectedPrincipal(e);
            // }}
          />
        </div>
      </Grid>
    </Card>
  );
}

export default BranchTab;
