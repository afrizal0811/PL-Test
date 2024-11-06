import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { InputAdornment, Paper as MuiPaper, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component, useState } from "react";
import QrReader from "react-qr-scanner";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: [],
      openScanner: false,
    };

    this.handleScan = this.handleScan.bind(this);
    console.log("ini handle scan", this.handleScan);
  }
  openComponent() {
    this.setState({ openScanner: !this.state.openScanner });
  }
  handleScan(data) {
    this.setState({
      result: data,
    });
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    const columnsScan = [
      {
        field: "OrderNbr",
        headerName: "Order Nbr",
        width: 200,
      },
      {
        field: "StatusSO",
        headerName: "Status SO",
        width: 200,
      },
      {
        field: "ShipmentNbr",
        headerName: "Shipment Nbr",
        width: 200,
      },
      {
        field: "StatusShipment",
        headerName: "Status Shipment",
        width: 200,
      },
      {
        field: "CustomerID",
        headerName: "Customer",
        width: 200,
      },
      {
        field: "CustomerName",
        headerName: "Customer Name",
        width: 200,
      },
      {
        field: "OwnerName",
        headerName: "Owner",
        width: 200,
      },
    ];

    const rowsScan = [];

    const openScanner = this.state;
    const previewStyle = {
      height: 240,
      width: 320,
    };

    const textStyle = {
      fontSize: "30px",
      textAlign: "center",
      marginTop: "-50px",
    };
    const QrReaderOpen = () => {
      const [qrReaderOpen, setQRReaderOpen] = useState(false);
      const onShowQr = () => setQRReaderOpen((value) => !value);
      console.log(this.state.openScanner);
      return <></>;
    };

    const Results = () => (
      <QrReader
        delay={this.state.delay}
        style={previewStyle}
        onError={this.handleError}
        onScan={this.handleScan}
      />
    );

    // this.state.result[0]

    return (
      <div>
        {this.state.openScanner === true ? (
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        ) : null}
        <QrReaderOpen />
        <p>Scan Order Nbr.</p>
        <TextField
          id="outlined-number"
          // value={
          //   this.state.result == null ? null : this.state.result[0].OrderNbr
          // }
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => this.openComponent()}
                >
                  <QrCodeScannerIcon />
                </IconButton>
              </InputAdornment>
            ),
            readOnly: true,
          }}
        />
        <Paper mt={6}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              rows={rowsScan}
              columns={columnsScan}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default QRScanner;
