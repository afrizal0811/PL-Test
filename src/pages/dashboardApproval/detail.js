import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import {
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import NumberFormat from "react-number-format";
import { GetConfig } from "../../utils/ConfigHeader";
import { getEmployeeName } from "../../utils/jwt";
import { NotifyError, NotifySuccess } from "../services/notification.service";

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background: ${(props) => props.theme.palette.common.black};
    color: ${(props) => props.theme.palette.common.white};
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
  }
`;

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

function DetailPengajuan(props) {
  const { Detail } = props;
  const [Data, setData] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [DataCust, setDataCust] = React.useState([]);
  const [valueRadioStatus, setValue] = React.useState("Approve");
  const { id } = useParams();

  useEffect(() => {
    setData(Detail.detail);
    console.log("detail", Detail);
  }, [Detail.detail]);

  const SubmitApproval = async () => {
    setLoading(true);
    try {
      // console.log(formData);
      const payload = Data.map((ae) => {
        return {
          idListSOOtorisasi: ae.idListSOOtorisasi,
          approvalOption: !!ae.approvalOption ? ae.approvalOption : "Pending",
          approver: getEmployeeName(),
          ketOtorisasi: "",
        };
      });
      console.log(payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/ApprovalList/SubmitApproval",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah Disimpan");
            setTimeout(() => {
              window.location.href = `/dashboard-approval/`;
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

  const handleChangeRadioStatus = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container spacing={6} mt={6}>
      <Grid item xs={12} style={{ border: "solid" }} ml={6}>
        <Typography variant="h3" gutterBottom display="inline">
          Persetujuan Customer
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          No. Pengajuan: {id}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tgl. Pengajuan: {moment(Detail.datePosting).format("DD-MM-YYYY")}
        </Typography>
        <Card mb={6} mt={6} mr={6}>
          {Detail.detail.map((dataDetail, i) => {
            return (
              <>
                <Divider
                  my={6}
                  mr={6}
                  style={{
                    height: "5px",
                    border: "none",
                    backgroundColor: "#0DCAF0",
                  }}
                />
                <CardHeader
                  title={dataDetail.companyName}
                  style={{
                    backgroundColor: "#D2D2D2",
                  }}
                />
                <CardContent>
                  <Paper>
                    <Table size="small">
                      <TableBody>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Batas Piutang
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.batasPiutang}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Umur JT Terlama
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            {/* {moment(dataDetail.umurJTTerlama).format("DD-MM-YYYY")} */}
                            {dataDetail.umurJTTerlama}
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Top Lock (Print)
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            {dataDetail.topLock}
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Piutang Sudah JT
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.piutangSudahJT}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Rencana Piutang
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.rencanaPiutang}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Rencana Kirim
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.rencanaKirim}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Umur 0-30
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.umur030}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Umur 31-45
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.umur3145}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Umur 46-60
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.umur4660}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Umur {">"} 60
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.umur60}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                        <CustomTableRow>
                          <CustomTableCell component="th" scope="row">
                            Uang Muka
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            <NumberFormat
                              value={dataDetail.uangMuka}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <span {...props}>{value}</span>
                              )}
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                      </TableBody>
                    </Table>
                  </Paper>
                  <Typography variant="subtitle1" gutterBottom mt={4}>
                    No. Faktur:{" "}
                    {dataDetail.noFaktur.split(",").map((ae) => {
                      return ae + ", ";
                    })}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Jumlah:{" "}
                    <NumberFormat
                      value={dataDetail.jumlah}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <span {...props}>{value}</span>
                      )}
                    />{" "}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Keterangan: {dataDetail.keterangan}
                  </Typography>
                  {Detail.submit == true ? (
                    <>
                      {dataDetail.approve == true ? (
                        <FormControl component="fieldset" variant="standard">
                          <RadioGroup
                            aria-label="Status"
                            disabled={Loading}
                            name="status"
                            value={Data[i]?.approvalOption}
                            onChange={(e) => {
                              Data[i].approvalOption = e.target.value;
                              console.log("e", e);
                              console.log("data[i]", Data[i]);
                            }}
                            row
                          >
                            <FormControlLabel
                              mr={2}
                              value="Approve"
                              control={<Radio />}
                              label="Approve"
                              display="inline"
                            />
                            <FormControlLabel
                              mr={2}
                              value="Reject"
                              control={<Radio />}
                              label="Reject"
                              display="inline"
                            />
                          </RadioGroup>
                        </FormControl>
                      ) : (
                        <FormControl component="fieldset" variant="standard">
                          <RadioGroup
                            aria-label="Status"
                            name="status"
                            disabled={Loading}
                            value={Data[i]?.approvalOption}
                            onChange={(e) => {
                              Data[i].approvalOption = e.target.value;
                              console.log("e", e);
                              console.log("data[i]", Data[i]);
                            }}
                            row
                          >
                            <FormControlLabel
                              mr={2}
                              value="Forward"
                              control={<Radio />}
                              label="Forward"
                              display="inline"
                            />
                            <FormControlLabel
                              mr={2}
                              value="Pending"
                              control={<Radio />}
                              label="Pending"
                              display="inline"
                            />
                            <FormControlLabel
                              mr={2}
                              value="Reject"
                              control={<Radio />}
                              label="Reject"
                              display="inline"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </CardContent>
              </>
            );
          })}
        </Card>
        {Detail.submit ? (
          <Button
            variant="contained"
            color="primary"
            disabled={Loading}
            mb={6}
            onClick={() => SubmitApproval()}
          >
            Submit
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default DetailPengajuan;
