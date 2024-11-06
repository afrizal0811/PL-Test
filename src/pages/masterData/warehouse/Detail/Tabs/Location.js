import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper as MuiPaper } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import Loader from "../../../../../components/Loader";

const Paper = styled(MuiPaper)(spacing);

const columnsLocation = [
  {
    field: "locationID",
    headerName: "Location ID",
    width: 200,
  },
  // {
  //   field: "description",
  //   headerName: "Description",
  //   type: "text",
  //   width: 200,
  // },
  {
    field: "description",
    headerName: "Description",
    type: "text",
    width: 200,
    renderCell: (params) => {
      return <>{params.row.locationID}</>;
    },
  },
];

export default function Location(props) {
  const [pageSizeLocation, setPageSizeLocation] = useState(5);
  const [selectionLocation, setSelectionLocation] = useState(0);
  const [page, setpage] = useState(1);
  const [totalpage, settotalpage] = useState(0);
  const [data, setdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getLocation(1);
  }, []);

  const getLocation = async (page) => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/WarehouseReps/DropDown/Location?page=${page}&rowsCount=5&warehouseID=${id}`,
          GetConfig()
        )
        .then(function (res) {
          console.log(res);
          if (res.status == 200) {
            let resdata = res.data[0];
            settotalpage(resdata.totalCountData);
            // setdata(resdata.record);
            setdata(resdata.record);
          }
        });
    } catch (error) {
      console.log(error.message);
      props.setLoading(false);
    }
  };

  return (
    <TabPanel value="1">
      <Paper>
        {props.loading ? (
          <Loader />
        ) : (
          <Paper>
            <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
              <DataGrid
                rowsPerPageOptions={[5]}
                getRowId={(ro) => ro.locationID}
                rows={data}
                columns={columnsLocation}
                pageSize={pageSizeLocation}
                onPageSizeChange={(newPageSize) =>
                  setPageSizeLocation(newPageSize)
                }
                selectionModel={selectionLocation}
                onSelectionModelChange={(selection) => {
                  setSelectionLocation(selection);
                }}
                rowCount={totalpage}
                page={page - 1}
                paginationMode="server"
                pagination
                onPageChange={(page) => {
                  getLocation(page + 1);
                  setpage(page + 1);
                  console.log("page = ", page);
                }}
              />
            </div>
          </Paper>
        )}
      </Paper>
    </TabPanel>
  );
}
