import { TabPanel } from "@material-ui/lab";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { NotifyError } from "../../../services/notification.service";
const columns = [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
  },
  {
    field: "displayName",
    headerName: "Display Name",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    type: "text",
    width: 200,
  },
];
export default function Membership() {
  const [dataTable, setDataTable] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [paramsPayload, setParams] = useState({
    page: 1,
    rowsCount: 5,
  });
  const [paginationData, setPaginationData] = useState({
    totalAvailablePage: 0,
    totalCountData: 0,
  });
  const handleGetMember = async () => {
    try {
      setLoading(true);
      const payload = {
        ...GetConfig(),
        params: {
          roleId: params.id,
          ...paramsPayload,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/UserRole`,
        payload
      );
      const res = data[0];
      setDataTable(res.record);
      setPaginationData({
        totalAvailablePage: res.totalAvailablePage,
        totalCountData: res.totalCountData,
      });
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.id) {
      handleGetMember();
    }
  }, [paramsPayload]);
  return (
    <TabPanel value="1">
      <Paper>
        <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
          <DataGrid
            loading={loading}
            page={paramsPayload.page - 1}
            rowCount={paginationData.totalCountData}
            paginationMode="server"
            rowsPerPageOptions={[5, 10, 25]}
            getRowId={(row) => row.userRoleID}
            rows={dataTable}
            columns={columns}
            onPageChange={(page) => {
              setParams({ ...paramsPayload, page: page + 1 });
            }}
            pageSize={paramsPayload.rowsCount}
            onPageSizeChange={(newPageSize) =>
              setParams({ page: 1, rowsCount: newPageSize })
            }
          />
        </div>
      </Paper>
    </TabPanel>
  );
}
