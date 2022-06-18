import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.js";

import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { addCar } from "../../api/Api";
import FileBase from "react-file-base64";

const initialValue = {
  brand: "",
  model: "",
  registrationYear: "",
  fuelType: "",
  transmissionType: "",
  registrationState: "",
  carImages: "",
  price: "",
  engine: "",
  milage: "",
  color: "",
  doors: "",
  seats: "",
  airbags: "",
  airconditioning: "",
  acceleration: "",
  drivingrange: "",
  // owner: localStorage.getItem('token'),
  description: "",
};

const Sellcar = () => {
  const paperStyle = {
    padding: "20px",
    height: "160vh",
    width: 580,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "green" };

  const [cardetail, setCardetail] = useState(initialValue);

  const {
    brand,
    model,
    registrationYear,
    fuelType,
    transmissionType,
    registrationState,
    carImages,
    price,
    engine,
    milage,
    color,
    doors,
    seats,
    airbags,
    airconditioning,
    acceleration,
    drivingrange,
    description,
  } = cardetail;

  // console.log(carImages);
  let history = useHistory();

  const onValueChange = (e) => {
    // console.log(e.target.value);
    setCardetail({ ...cardetail, [e.target.name]: e.target.value });
  };
  // const onfileChange = (e) => {
  //     console.log(e.target.files[0]);
  //     setCardetail({ ...cardetail, carImages: e.target.files[0] })
  // }

  const addCarDetails = async () => {
    console.log("submit button clicked");
    // console.log(cardetail);
    const token = localStorage.getItem("token");
    // console.log(ownerName);
    cardetail.ownerDetails = token;
    console.log(cardetail);
    const responce = await addCar(cardetail);
    console.log("responce", responce.data);
    history.push("/");
  };

  const clear = () => {
    setCardetail(initialValue);
  };

  return (
    <>
      <Navbar />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Add Car Details</h2>
          </Grid>
          {/* <form action="http://localhost:4000/users/addcar" method="post" encType="multipart/form-data"> */}

          <TextField
            onChange={(e) => onValueChange(e)}
            name="brand"
            vaariant="outlined"
            label="Brand"
            value={brand}
            fullWidth
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="model"
            vaariant="outlined"
            label="Model"
            value={model}
            fullWidth
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="registrationYear"
            vaariant="outlined"
            label="Registration Year"
            value={registrationYear}
            fullWidth
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="fuelType"
            vaariant="outlined"
            label="Fuel Type"
            value={fuelType}
            fullWidth
            placeholder="Petrol/ Diesel/ CNG/ Electric"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="transmissionType"
            vaariant="outlined"
            label="Transmission Type"
            value={transmissionType}
            fullWidth
            placeholder="Automatic / manual"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="registrationState"
            vaariant="outlined"
            label="Registration State"
            value={registrationState}
            fullWidth
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="price"
            vaariant="outlined"
            label="Price"
            value={price}
            fullWidth
            placeholder="in Rupees"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="engine"
            vaariant="outlined"
            label="Engine"
            value={engine}
            fullWidth
            placeholder="CC"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="milage"
            vaariant="outlined"
            label="Milage"
            value={milage}
            fullWidth
            placeholder="Km/Litre"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="color"
            vaariant="outlined"
            label="Color"
            value={color}
            fullWidth
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="doors"
            vaariant="outlined"
            label="Doors"
            value={doors}
            fullWidth
            placeholder="Count"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="seats"
            vaariant="outlined"
            label="Seats"
            value={seats}
            fullWidth
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="airbags"
            vaariant="outlined"
            label="Airbags"
            value={airbags}
            fullWidth
            placeholder="Count"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="airconditioning"
            vaariant="outlined"
            label="Air-conditioning"
            value={airconditioning}
            fullWidth
            placeholder="YES / NO"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="acceleration"
            vaariant="outlined"
            label="Acceleration"
            value={acceleration}
            fullWidth
            placeholder="0 KM TO 100 KM IN SECONDS"
          />
          <TextField
            onChange={(e) => onValueChange(e)}
            name="drivingrange"
            vaariant="outlined"
            label="Driving-range"
            value={drivingrange}
            fullWidth
            placeholder="Estimated distance / Full fuel Tank"
          />
          {/* <TextField onChange={(e) => onValueChange(e)} name="owner" vaariant="outlined" label="owner" value={owner} fullWidth  disable/> */}
          <TextField
            onChange={(e) => onValueChange(e)}
            name="description"
            vaariant="outlined"
            label="Description"
            value={description}
            fullWidth
          />

          <FileBase
            type="file"
            name="carImages"
            value={carImages}
            multiple={false}
            onDone={({ base64 }) =>
              setCardetail({ ...cardetail, carImages: base64 })
            }
          />

          {/* <input type="file" name="carImages" onChange={(e) => onfileChange(e)} /> */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={addCarDetails}
            fullWidth
          >
            Submit
          </Button>
          <br />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>

          {/* </form> */}
        </Paper>
      </Grid>
    </>
  );
};

export default Sellcar;
