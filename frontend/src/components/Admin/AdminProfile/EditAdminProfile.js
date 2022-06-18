import React, { useState, useEffect } from "react";
import Navbar from "../AdminNavbar/AdminNavbar";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { Link } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { getAdminDetails, updateAdmin } from "../../../api/Api";

const initialValue = {
  mobilenumber: "",
  email: "",
  username: "",
  password: "",
};

const EditAdminProfile = () => {
  const paperStyle = {
    padding: "20px",
    height: "80vh",
    width: 580,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "green" };
  const btnStyle = { margin: "20px auto" };

  // const initialValue = {
  //     // _id: userInfo.location.state.userInfo._id,
  //     // fullname: userInfo.location.state.userInfo.fullname,
  //     // district: userInfo.location.state.userInfo.district,
  //     // state: userInfo.location.state.userInfo.state,
  //     // mobilenumber: userInfo.location.state.userInfo.mobilenumber,
  //     // email: userInfo.location.state.userInfo.email,
  //     // username: userInfo.location.state.userInfo.username,
  //     // password: userInfo.location.state.userInfo.password,
  // }

  const [user, setUser] = useState(initialValue);
  const { mobilenumber, email, username, password } = user;
  // console.log(user);

  const fetchAdminDetails = async () => {
    const token = localStorage.getItem("admintoken");
    // console.log("token is ", token);
    const adminDetails = await getAdminDetails(token);
    // console.log("admin details", adminDetails.data);
    setUser(adminDetails.data);
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  let history = useHistory();

  const onValueChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateAdminDetails = async () => {
    console.log("clicked");
    console.log(user);
    const responce = await updateAdmin(user);
    if (responce.data === "updated") {
      alert("Admin details updated successfully, Login Again");
      localStorage.removeItem("admintoken");
      history.push("/admin");
    } else {
      alert("Admin details not updated");
    }
  };

  // console.log("userInfo", userInfo.location.state.userInfo);

  return (
    <>
      <Navbar />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Edit Admin Profile</h2>
          </Grid>

          <TextField
            onChange={(e) => onValueChange(e)}
            name="username"
            value={username}
            label="Username"
            placeholder="Enter Username"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="password"
            value={password}
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="mobilenumber"
            value={mobilenumber}
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="email"
            value={email}
            label="Email"
            placeholder="Enter Email"
            fullWidth
            required
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
            onClick={() => updateAdminDetails()}
          >
            Update Profile
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default EditAdminProfile;
