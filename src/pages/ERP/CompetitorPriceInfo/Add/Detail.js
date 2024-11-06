import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, spacing } from "@material-ui/system";
import {
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components/macro";
// import config from "../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);

Detail.propTypes = {
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

export default function Detail(props) {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Image, setImage] = useState([]);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(props.imgData);
  const [description, setDescription] = useState(props.description);

  //state Product Group ID

  useEffect(() => {
    setImgData(props.imgData);
    console.log("imgData => ", props.imgData);
  }, [props]);

  const handleOpenImg = async (e) => {
    // var newTab = window.open();
    // newTab.document.body.innerHTML = `<img src="${e}">`;
    const image = await fetch(e);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "Competitor.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = (e) => {
    // let file;
    console.log("upload", e);
    if (e.target.files) {
      const file = Array.from(e.target.files);
      console.log({ file });
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

  const handleDeleteImage = async (e) => {
    console.log("event ", e.target.value);
    let DeletedImage = imgData.filter((item) => item !== e.target.value);
    console.log("Deleted: ", DeletedImage);
    document.getElementById("inputfile").value = null;
    props.setImgData(DeletedImage);
    // console.log("image: ", imgData);
  };

  return (
    <Card mb={6}>
      <Grid container spacing={6} md={12} mt={3}>
        <Grid item md={6} xs={12}>
          <label style={{ marginTop: "10px" }} htmlFor="inputfile">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="inputfile"
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
            <Carousel>
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
    </Card>
  );
}
