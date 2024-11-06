import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
// import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, spacing } from "@material-ui/system";
import {
  FormHelperText,
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Carousel from "react-material-ui-carousel";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import ProdukPopup from "./ProductPopup";
// import config from "../../../../utils/ConfigHeader";
import Swal from "sweetalert2";
import { GetConfig } from "../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);

DetailApproval.propTypes = {
  PromoActID: PropTypes.any,
  imgData: PropTypes.any,
  description: PropTypes.any,
  TempProduct: PropTypes.any,
  TempPromoID: PropTypes.any,
  TempCustomer: PropTypes.any,
  Hasil: PropTypes.any,
  Date: PropTypes.any,
  Location: PropTypes.any,
  submit: PropTypes.any,
};

export default function DetailApproval(props) {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Image, setImage] = useState([]);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(props.imgData);
  const [description, setDescription] = useState(props.description);

  //state Product Group ID
  const [openProduk, setopenProduk] = React.useState(false);
  const [TempProduct, setTempProduct] = React.useState(props.TempProduct);

  useEffect(() => {
    setTempProduct(props.TempProduct);
    setDescription(props.description);
    setImgData(props.imgData);
    console.log("imgdata", props.imgData);
  }, [props]);

  const handleOpenImg = async (e) => {
    // var newTab = window.open();
    // newTab.document.body.innerHTML = `<img src="${e}">`;
    const image = await fetch(e);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "Promotion Activity.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = (e) => {
    // let file;
    if (e.target.files) {
      const file = Array.from(e.target.files);

      if (
        file.filter(
          (item) => item.type !== "image/jpeg" && item.type !== "image/png"
        ).length > 0
      ) {
        window.alert("Please upload a image file only");
        return false;
      }
      const promises = file.map((files) => {
        console.log("file", files);
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onload = (e) => {
            // resolve(e.target.result);
            var img = document.createElement("img");
            img.onload = () => {
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              var MAX_WIDTH = 300;
              var MAX_HEIGHT = 300;
              var width = img.width;
              var height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              canvas.width = width;
              canvas.height = height;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);
              var dataurl = canvas.toDataURL("image/png");
              console.log("datausrl", dataurl);
              resolve(dataurl);
              // this.setState({ previewSrc: dataurl });
            };
            img.src = e.target.result;
          };
        });
      });
      setImage(file);
      Promise.all(promises).then(
        (images) => {
          setImgData(imgData.concat(images));
          props.setImgData(imgData.concat(images));
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/PromoActivity/Delete/" +
            props.id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            setTimeout(() => {
              window.location.href = `/promo-activity}`;
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

  const notifyConfirm = async () => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        deleteData();
      }
    });
  };

  // const handleDeleteImage = async (e) => {
  //   // window.location.reload();
  //   console.log("event ", e.target.value);
  //   let DeletedImage = imgData.filter(
  //     (item) => item.promoFile == e.target.value
  //   );
  //   console.log("Deleted: ", DeletedImage);
  //   if (DeletedImage[0].isnew) {
  //     let newData = imgData.filter((item) => item.promoFile !== e.target.value);
  //     console.log("newdata: ", newData);
  //     setImgData(newData);
  //     props.setImgData(newData);
  //   } else {
  //     await axios
  //       .delete(
  //         `${process.env.REACT_APP_DOMAIN_API_BARU}` +
  //           "/PromoActivity/DeletePic/" +
  //           DeletedImage[0].fileUploadID
  //         // config
  //       )
  //       .then(function (response) {
  //         // handle success
  //         console.log(response);
  //         if (response.status == 200 || response.status == 201) {
  //           let newData = imgData.filter(
  //             (item) => item.promoFile !== e.target.value
  //           );
  //           console.log("newdata: ", newData);
  //           setImgData(newData);
  //           props.setImgData(newData);
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         NotifyError("There was an error!", error);
  //         console.log(error);
  //       });
  //   }
  //   // console.log("image: ", imgData);
  // };

  const handleDeleteImage = async (e) => {
    // window.location.reload();
    console.log("event ", e.target.value);
    let DeletedImage = imgData.filter((item) => item !== e.target.value);
    console.log("Deleted: ", DeletedImage);
    props.setImgData(DeletedImage);
    // console.log("image: ", imgData);
  };

  return (
    <Card mb={6}>
      <hr />
      <Typography variant="h6" mt={5} gutterBottom>
        Detail
      </Typography>
      <Typography variant="body2" gutterBottom mt={3}>
        Promo Activity
      </Typography>
      <Grid container spacing={6} md={12} mt={3}>
        <Grid item md={6} xs={12}>
          <Grid container spacing={4} md={12}>
            <Grid item md={6} xs={12}>
              <TextField
                name="Product Group"
                label="Product Group"
                value={TempProduct}
                color={!TempProduct ? "warning" : ""}
                focused={!TempProduct ? true : false}
                fullWidth
                required
                // onClick={() => setopenProduk(true)}
                variant="outlined"
                disabled={false}
                // onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  "aria-readonly": true,
                }}
              />
              {!TempProduct && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="Branch"
                label="Branch"
                value={props.Branch}
                fullWidth
                // onClick={() => setopenProduk(true)}
                variant="outlined"
                disabled={false}
                // onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  "aria-readonly": true,
                }}
              />
            </Grid>
          </Grid>
          <TextField
            name="Description"
            mt={6}
            label="Description"
            value={description}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            disabled={false}
            onChange={(e) => props.setDescription(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
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
            <Carousel autoPlay={false}>
              {imgData.map((item, i) => (
                <Box
                  sx={{
                    // width: "100%",
                    // borderColor: "#a8caed",
                    color: "primary.main",
                    padding: "15px",
                    justifyContent: "center",
                    border: 2,
                    margin: 5,
                    display: "flex",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <img
                      src={item}
                      // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      style={{ maxHeight: "150px" }}
                      // alt={item.title}
                      loading="lazy"
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      mt={2}
                      value={item}
                      // startIcon={<DeleteIcon />}
                      // disabled={PromoActID === "" || Loading}
                      onClick={(e) => handleOpenImg(e.target.value)}
                    >
                      Open
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      mt={2}
                      value={item}
                      startIcon={<DeleteIcon />}
                      // disabled={PromoActID === "" || Loading}
                      onClick={(e) => handleDeleteImage(e)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </Carousel>
          )}
        </Grid>
      </Grid>
      <ProdukPopup
        openProduk={openProduk}
        setopenProduk={(e) => {
          setopenProduk(e);
          console.log("ee", e);
        }}
        TempProduct={TempProduct}
        setTempProduct={(e) => {
          setTempProduct(e);
          props.setTempProduct(e);
        }}
      />
    </Card>
  );
}
