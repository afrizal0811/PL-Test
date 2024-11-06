import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Loader from "../../../components/Loader";
import MobileTable from "../../../components/shared/MobileTable";
import { GetConfig } from "../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  // {
  //   field: "pallet",
  //   headerName: "Pallet",
  //   flex: 1,
  //   minWidth: 100,
  // },
  // {
  //   field: "product",
  //   headerName: "Product",
  //   width: 115,
  // },
  // {
  //   field: "qty",
  //   headerName: "Qty On Hand",
  //   width: 100,
  // },
  // {
  //   field: "qtyAvail",
  //   headerName: "Qty Available",
  //   width: 100,
  // },
  {
    field: "docDate",
    headerName: "Date",
    sortable: false,
    width: 100,
  },
  {
    field: "branchID",
    headerName: "Branch",
    sortable: false,
    width: 100,
  },
  {
    field: "customerID",
    headerName: "CustomerID",
    sortable: false,
    width: 100,
  },
  {
    field: "customerName",
    headerName: "Customer",
    sortable: false,
    width: 100,
  },
  {
    field: "customerName",
    headerName: "Customer",
    sortable: false,
    width: 100,
  },
  {
    field: "inventoryID_Desc",
    headerName: "Item",
    sortable: false,
    width: 100,
  },
  {
    field: "uom",
    headerName: "UOM",
    sortable: false,
    width: 100,
  },
  {
    field: "qtyStock",
    headerName: "Qty",
    sortable: false,
    width: 100,
  },
  {
    field: "expDateStock",
    headerName: "Expiry Date",
    sortable: false,
    width: 100,
  },
];

const datadummy = [
  {
    RefNbr: "pallet1",
    BranchID: "product1",
    Status: 10,
    Date: 8,
  },
];

function ListingTabel() {
  const [warehouse, setwarehouse] = useState("");
  const [location, setlocation] = useState("");
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(1);
  const history = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  // Ini untuk pengaturan alamat API
  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/ExpiryDate/Pagination?page=${curretPage + 1}&rowsCount=5`,
          GetConfig()
          // `http://localhost:5000/GetExpiryDateByPagination?page=${curretPage}&rowsCount=${pageSize}`
        )
        .then(function (response) {
          // handle success
          if (response.status == 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
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
    <Card mb={0} pb={0} sx={{ height: "90%" }}>
      <CardContent>
        {loading ? (
          <Loader />
        ) : (
          <MobileTable
            data={data}
            rowDetail={columns}
            // label={"Expiry Date"}
            id={"refNbr"}
            totaldata={totalPage}
            page={curretPage}
            onCellDoubleClick={(e) => {
              history(`/expiry-date/detail/${e}`);
            }}
            onPageChange={(e, page) => {
              setcurretPage(page);
              getData();
              console.log("page = ", page);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

function MobileListingExpiryDate() {
  return (
    <React.Fragment>
      <Helmet title="Expiry Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={3}>
        <Link component={NavLink} to="/mobile">
          Mobile
        </Link>
        {/* <Link component={NavLink} to="/mobile/allocated-kuota">
          Expiry Date
        </Link> */}
        <Typography>Expiry Date</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Expiry Date
      </Typography>

      <Divider my={5} />

      <ListingTabel />
    </React.Fragment>
  );
}

export default MobileListingExpiryDate;
