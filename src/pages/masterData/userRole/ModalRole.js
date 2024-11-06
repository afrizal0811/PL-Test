import { Box, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import { NotifyError } from "../../services/notification.service";
const Container = styled(Box)`
  transform: translate(-50%, -50%);
`;
const ContainerTable = styled.div`
  height: 85%;
  background: white;
`;
const columns = [
  {
    field: "RoleName",
    headerName: "Role Name",
    width: 200,
  },
  {
    field: "RoleDescription",
    headerName: "Role Description",
    width: 200,
  },
];
function ModalRole({ open, onSelect, onCancel, data: dataUser }) {
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState("");
  const selectedItem = useMemo(() => {
    return data.find((el) => el.RoleID === selection[0]) || {};
  }, [selection, data]);
  const handleGetData = async () => {
    try {
      const config = GetConfig();
      const payload = {
        ...config,
        params: {
          page: 1,
          rowsCount: 10,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole`,
        payload
      );
      setData(data);
    } catch (error) {
      NotifyError("There was an error!", error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  useEffect(() => {
    if (dataUser.roleID) {
      setSelection([dataUser.roleID]);
    }
  }, [dataUser]);
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
        bgcolor="#F6F9FC"
        position="absolute"
        width="100%"
        height="100%"
        maxWidth="1300px"
        maxHeight="677px"
        left="50%"
        top="50%"
        p={3}
      >
        <Typography variant="h3" gutterBottom>
          User Role
        </Typography>
        <ContainerTable>
          <DataGrid
            rows={data}
            columns={columns}
            hideFooter
            getRowId={(row) => row.RoleID}
            selectionModel={selection}
            onSelectionModelChange={(prop) => {
              setSelection(prop);
            }}
          />
        </ContainerTable>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            onClick={() => onSelect(selectedItem)}
            disabled={!selectedItem.RoleID}
            size="large"
            variant="text"
            mr={3}
          >
            Select
          </Button>
          <Button onClick={onCancel} size="large" variant="text">
            Cancel
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}

export default memo(ModalRole);
