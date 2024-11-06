import { spacing } from "@material-ui/system";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  CardContent as MuiCardContent,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import Tabs from "./Tabs/Tabs";

const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

const Cbrole = [
  {
    role: "Admin",
    desc: "Administrator",
    member: [
      {
        username: "admin",
        displayName: "Maxwell Beker",
        status: "Active",
        comment: "",
      },
    ],
    accessRight: [
      {
        screen: "Kendaraan",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "Shipping Zone",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "List SO",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "Employee",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "Driver",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
    ],
  },
  {
    role: "APClerk",
    desc: "Staff AP",
    member: [
      {
        username: "superman",
        displayName: "Kal El",
        status: "Active",
        comment: "",
      },
      {
        username: "batman",
        displayName: "Bruce Wayne",
        status: "Active",
        comment: "",
      },
    ],
    accessRight: [
      {
        screen: "Employee",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "Driver",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
    ],
  },
  {
    role: "BranchAW",
    desc: "Staff Branch AW",
    member: [
      {
        username: "captaio",
        displayName: "Captain America",
        status: "Active",
        comment: "",
      },
      {
        username: "spiderman",
        displayName: "Peter Parker",
        status: "Active",
        comment: "",
      },
      {
        username: "ironman",
        displayName: "Tony Stark",
        status: "Active",
        comment: "",
      },
    ],
    accessRight: [
      {
        screen: "Kendaraan",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "Shipping Zone",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
      {
        screen: "List SO",
        detail: [
          {
            namaAccess: "Add new Item",
            Access: "true",
          },
          {
            namaAccess: "Read Detail",
            Access: "true",
          },
          {
            namaAccess: "Delete Detail",
            Access: "true",
          },
        ],
      },
    ],
  },
];

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [Role, setRole] = useState([]);
  const [RoleName, setRoleName] = useState("");
  const [screenNo, setscreenNo] = useState("");
  const [description, setdescription] = useState("");
  const [member, setmember] = useState([]);
  const [access, setaccess] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    console.log("id", id);
    if (id != undefined) {
      // getData();
      let roles = Cbrole.filter((data) => data.role == id);
      console.log("roles", roles);
      if (roles.length > 0) {
        setRole(roles[0]);
        setdescription(roles[0].desc);
        setRoleName(roles[0].role);
        setmember(roles[0].member);
        setaccess(roles[0].accessRight);
      }
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ScreenNoReps/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            setRoleName(resdata.RoleName);
            setscreenNo(resdata.RoleName);
            setdescription(resdata.Description);
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

  const createData = async () => {
    setLoading(true);
    try {
      const payload = {
        RoleName: RoleName,
        // screenNo: screenNo,
        description: description,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/ScreenNoReps/CreateMasterScreenNo",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/screen-number/detail/${RoleName}`;
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

  const editData = async () => {
    setLoading(true);
    try {
      const payload = {
        RoleName: RoleName,
        // screenNo: screenNo,
        description: description,
      };
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/ScreenNoReps/UpdateMasterScreenNo/",
          payload
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiUbah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/screen-number/detail/${RoleName}`;
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

  const onSumbitHandler = async () => {
    if (id == undefined) {
      createData();
    } else {
      editData();
    }
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          User Role
        </Typography>
        <Grid container spacing={2} md={5} mt={3}>
          <Grid item md={4} xs={4}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              disabled={Role == "" || description == ""}
              // onClick={onSumbitHandler}
            >
              Save
            </Button>
          </Grid>
          <Grid item md={4} xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="medium"
              // disabled={RoleName == "" || description == ""}
              // onClick={onSumbitHandler}
            >
              Delete
            </Button>
          </Grid>
          <Grid item md={4} xs={4}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              size="medium"
              // disabled={RoleName == "" || description == ""}
              // onClick={onSumbitHandler}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} md={8} mt={1}>
          <Grid item md={6} xs={6}>
            <TextField
              name="RoleName"
              label="Role Name"
              value={RoleName}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              disabled={id != undefined}
              onChange={(e) => setRoleName(e.target.value)}
            />
            {/* <Autocomplete
              // freeSolo
              onChange={(event, newValue) => {
                let op = Cbrole.filter((item) => item.role == newValue);
                if (op.length > 0) {
                  setRole(op[0]);
                  setdescription(op[0].desc);
                  setmember(op[0].member);
                  setaccess(op[0].accessRight);
                }
                console.log("op", op[0]);
                console.log("role", Role);
              }}
              sx={{ mt: 2 }}
              options={Cbrole.map((option) => option.role)}
              value={Role.role}
              renderInput={(params) => (
                <TextField {...params} label="Role Name" />
              )}
            /> */}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="description"
              label="Role Description"
              value={description}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
              my={2}
              onChange={(e) => setdescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} md={12} mt={1}>
          <Tabs Membership={member} AccessRights={access} />
        </Grid>
      </CardContent>
    </Card>
  );
}
