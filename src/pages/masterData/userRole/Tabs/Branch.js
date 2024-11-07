import { TabPanel } from "@mui/lab";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../../../utils/ConfigHeader";

const columns = [
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
export default function Branch({ data, handleChangeBranches }) {
  const [loading, setLoading] = useState(false);
  const [DataPincipal, setDataPincipal] = useState([]);
  const [SelectedPrincipal, setSelectedPrincipal] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getDataPrincipal();
  }, [data]);

  useEffect(() => {
    const propBranches = data?.branches;
    if (propBranches?.length > 0) {
      const arr = DataPincipal.filter((el) => {
        return propBranches.some((f) => {
          return f.branchID === el.BranchID && f.isLinked == true;
        });
      });
      setSelectedPrincipal(
        arr.map((a) => {
          return a.BranchID;
        })
      );
    }
  }, [DataPincipal]);

  useEffect(() => {
    const filteredNewBranches = selectedRows.filter(
      (branch) => branch.isLinked === true
    );
    const remapBranches = filteredNewBranches.map((branch) => {
      return {
        branchID: branch.BranchID,
        branchName: branch.BranchName,
        isLinked: branch.isLinked,
      };
    });
    handleChangeBranches(remapBranches);
  }, [selectedRows]);

  const getDataPrincipal = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/BranchReps/Dropdown/Branch",
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            setDataPincipal(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <TabPanel value="1">
      <Paper>
        <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
          <DataGrid
            rows={DataPincipal ?? []}
            getRowId={(row) => row.BranchID}
            columns={columns}
            hideFooter
            checkboxSelection
            disableSelectionOnClick
            selectionModel={SelectedPrincipal}
            onSelectionModelChange={(e) => {
              const selectedIDs = new Array(e);
              const newSelectedRows = DataPincipal.filter((r) => {
                if (selectedIDs[0]?.includes(r.BranchID)) {
                  r.isLinked = true;
                  r.branchID = r.BranchID;
                } else {
                  r.isLinked = false;
                  r.branchID = r.BranchID;
                }
                return r;
              });
              setSelectedPrincipal(e);
              setSelectedRows(newSelectedRows);
            }}
          />
        </div>
      </Paper>
    </TabPanel>
  );
}
