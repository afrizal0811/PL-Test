import { spacing } from "@material-ui/system";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  CardContent as MuiCardContent,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

export default function Header(props) {
  const [header, setHeader] = useState({
    warehouseID: "...",
    description: "...",
    active: false,
  });
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState("");
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [totalpage, settotalpage] = useState(0);
  const [cbWarehouse, setCbWarehouse] = useState([]);

  useEffect(() => {
    getData(id);
    getLocation(1);
  }, []);

  // const getCbWarehouse = async () => {
  //   await axios
  //     .get(
  //       `${process.env.REACT_APP_DOMAIN_API}` +
  //         "/WarehouseReps/DropDown/Warehouse"
  //     )
  //     .then(function (response) {
  //       // handle success
  //       // console.log(response);
  //       if (response.status == 200 || response.status == 201) {
  //         const resdata = response.data;
  //         const newres = [];
  //         Object.keys(resdata).forEach(function (key) {
  //           newres.push({
  //             warehouseID: resdata[key].WarehouseID,
  //             description: resdata[key].Description,
  //           });
  //         });
  //         setCbWarehouse(newres);
  //       }
  //     });
  // };

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
            props.setLocation(resdata.record);
          }
        });
    } catch (error) {
      console.log(error.message);
      props.setLoading(false);
    }
  };

  const getData = async (id) => {
    props.setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            // getLocation(1);
            // console.log(resdata);
            setHeader({
              warehouseID: resdata.WarehouseID,
              description: resdata.Description,
              active: resdata.Active,
              branch: resdata.Branch,
              replenishmentClass: resdata.ReplenishmentClass,
            });
            const newdatalocation = resdata.Locations.map((item, i) => {
              item.id = i;
              return item;
            });
            // props.setLocation(newdatalocation);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      props.setLoading(false);
    } catch (error) {
      console.log(error.message);
      props.setLoading(false);
    }
  };

  return (
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Header
      </Typography>
      <Typography variant="body2" gutterBottom mt={3}>
        Warehouse
      </Typography>
      <Grid container spacing={6} md={8} mt={3}>
        <Grid item md={6} sm={12} xs={6}>
          {/* <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            value={warehouse}
            onChange={(event, newValue) => {
              setWarehouse(newValue);
              // console.log(newValue);
            }}
            options={cbWarehouse}
            getOptionLabel={(option) =>
              option.warehouseID + " - " + option.description
            }
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.warehouseID} - {option.description}
              </Box>
            )}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                my={2}
                label="Warehouse ID"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          /> */}
          <TextField
            name="Warehouse ID"
            label="Warehouse ID"
            value={id}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="description"
            label="Description"
            value={header.description}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="replenishmentClass"
            label="Replenishment Class"
            value={header.replenishmentClass}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="branch"
            label="Branch"
            value={header.branch}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <FormControlLabel
            control={<Checkbox checked={header.active} name="gilad" />}
            label="Active"
          />
        </Grid>
      </Grid>
    </CardContent>
  );
}
