import { Add, Delete, Refresh, Reply, Save } from "@material-ui/icons";
import QrCodeScannerIcon from "@material-ui/icons/QrCodeScanner";
import SearchIcon from "@material-ui/icons/Search";
import { DatePicker } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Button as MuiButton,
  Paper as MuiPaper,
  TextField as MuiTextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

const DummyImage = [
  {
    photoID: "P001",
    nama: "pohon Utara",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    photoID: "P002",
    nama: "pohon Selatan",
    url: "https://wallpaperaccess.com/full/3832032.jpg",
  },
];

export default function Header() {
  const { id } = useParams();
  const [ProductGroupID, setProductGroupID] = useState("Popcorn");
  const [BranchID, setBranchID] = useState("");
  const [CPBrand, setCPBrand] = useState("Oishi");
  const [CPItem, setCPItem] = useState("Popcorn Caramel");
  const [CPPrice, setCPPrice] = useState("15.000,00");
  const [CPDesc, setCPDesc] = useState("Popcorn Caramel");
  const [CPDate, setCPDate] = useState(new Date());
  const [NoBPOM, setNoBPOM] = useState("MD273216107058");
  const [ImageComp, setImageComp] = useState("");
  const [Image, setImage] = useState([]);
  const [imgData, setImgData] = useState(DummyImage);
  const history = useNavigate();

  useEffect(() => {
    if (id != undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/${id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            setCPDate(resdata.docDate);
            setCPDesc(resdata.cpDesc);
            setCPPrice(resdata.cpPrice);
            setNoBPOM(resdata.noBPOM);
            // setImage(resdata.)
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
      // setLoading(false);
    }
  };

  const handleUpload = (e) => {
    // let file;
    if (e.target.files) {
      const file = Array.from(e.target.files);
      if (file.filter((item) => item.size > 2e6).length > 0) {
        window.alert("Please upload a file smaller than 2 MB");
        return false;
      }
      const promises = file.map((files) => {
        console.log("file", files);
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({ nama: files.name, url: e.target.result });
          };
          reader.readAsDataURL(files);
        });
      });
      setImage(file);
      Promise.all(promises).then(
        (images) => {
          setImgData(imgData.concat(images));
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleDeleteImage = async (e) => {
    // window.location.reload();
    console.log("event ", e.target.value);
    let newData = imgData.filter((item) => item.url !== e.target.value);
    console.log("image: ", newData);
    setImgData(newData);
    // console.log("image: ", imgData);
  };

  const handleSave = async () => {
    try {
      const payload = {
        DocDate: CPDate,
        CPDesc: CPDesc,
        // CPLocation: BranchID,
        CPPrice: CPPrice,
        // ScreenID: DescBPOM,
        NoBPOM: NoBPOM,
        Files: Image,
      };
      console.log("ini didalam handleSave, isi dari payload", payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/Update/${id}`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Dirubah");
            setTimeout(() => {
              history(`/competitor-price-info/`);
            }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <CardContent>
        <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
          <IconButton
            component="span"
            onClick={() => history("/competitor-price-info")}
          >
            <Reply />
          </IconButton>
          <IconButton component="span" onClick={handleSave}>
            <Save />
          </IconButton>
          <IconButton component="span" onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
          <IconButton component="span">
            <Add />
          </IconButton>
          <IconButton component="span">
            <Delete />
          </IconButton>
        </Grid>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                label="Product Group"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={ProductGroupID}
                onChange={(e) => {
                  setProductGroupID(e.target.value);
                }}
                style={{ width: "70%" }}
              />
            </Paper>
            <Paper mt={3}>
              <DatePicker
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={CPDate}
                inputFormat={"dd/MM/yyyy"}
                onChange={(e) => {
                  setCPDate(e.target.value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Competitor Brand"
                value={CPBrand}
                onChange={(e) => {
                  setCPBrand(e.target.value);
                }}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Competitor Item"
                value={CPItem}
                onChange={(e) => {
                  setCPItem(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Competitor Item"
                value={CPPrice}
                onChange={(e) => {
                  setCPPrice(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Barcode"
                value={NoBPOM}
                onChange={(e) => {
                  setNoBPOM(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        // onClick={() => this.openComponent()}
                      >
                        <QrCodeScannerIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                label="Branch"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={BranchID}
                onChange={(e) => {
                  setBranchID(e.target.value);
                }}
                style={{ width: "70%" }}
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-multiline-static"
                margin="dense"
                fullwidth={true}
                multiline
                label="Description"
                value={CPDesc}
                onChange={(e) => {
                  setCPDesc(e.target.value);
                }}
                rows={3}
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
      <Grid item md={6} xs={12} mt={6} ml={4}>
        <label style={{ marginTop: "10px" }} htmlFor="contained-button-file">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            onChange={handleUpload}
            type="file"
          />
          <Button
            variant="contained"
            id="contained-button-file"
            style={{ marginTop: "", height: "50px" }}
            fullWidth
            component="span"
          >
            Upload Image
          </Button>
        </label>
        {imgData && (
          <ImageList
            sx={{ width: [300, 500], height: 220 }}
            cols={2}
            // mx={"auto"}
          >
            {imgData.map((item, key) => (
              <ImageListItem key={key} sx={{ p: 3 }}>
                <img
                  src={item.url}
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  style={{ maxHeight: "150px" }}
                  // alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={
                    <>
                      <span>
                        {item.nama.slice(0, 10)}
                        {item.nama.length > 10 && "..."}
                      </span>
                      <button
                        value={item.url}
                        onClick={(e) => handleDeleteImage(e)}
                        style={{ float: "right" }}
                      >
                        Delete
                      </button>
                    </>
                  }
                  // title={item.title}
                  // subtitle={<button>Delete</button>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
    </>
  );
}
