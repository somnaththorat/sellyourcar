import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.js";
import {
  membershipInfo,
  updateMembership,
  reportCarDetails,
  // payment,
  razorpay,
  getUserInfo,
  addPaymentDetail,
} from "../../api/Api.js";
import carImage from "../../assets/img/carIcon.png";
// import axios from 'axios';
import { Grid } from "@material-ui/core";
import { Card, CardMedia } from "@material-ui/core";
import {
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Collapse from "@mui/material/Collapse";

//for table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

//car basic information table style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Cardetail = (car) => {
  // const [cardetail, setCardetails] = useState(car.location.state.car);
  const cardetail = car.location.state.car;
  // console.log(cardetail);

  // console.log("user info", cardetail.ownerDetails);
  // const ownerDetails = cardetail.ownerDetails.user;

  // fetch data from olx website
  // const [olxData, setOlxData] = useState([]);
  // console.log(cardetail)
  const olxUrl = `https://www.olx.in/items/q-${cardetail.model}?isSearchCall=true`;
  console.log(olxUrl);
  useEffect(() => {
    // fetchOlxData();
  }, []);

  // const fetchOlxData = async () => {
  //     fetch(`https://www.olx.in/items/q-${cardetail.model}?isSearchCall=true`)
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  // };

  // const fetchOlxData = async () => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // };

  function createDescriptionData(property, value) {
    return { property, value };
  }

  const rows2 = [
    createDescriptionData(
      "Acceleration (0-100 km/hr) ",
      cardetail.acceleration + " sec"
    ),
    createDescriptionData("Airbags ", cardetail.airbags),
    createDescriptionData(
      "Air-Conditioning",
      cardetail.airconditioning ? "Yes" : "No"
    ),
    createDescriptionData("color", cardetail.color),
    createDescriptionData("doors", cardetail.doors),
    createDescriptionData("driving Range", cardetail.drivingrange + " km"),
    createDescriptionData("Engine", cardetail.engine + "cc"),
    createDescriptionData("Milage", cardetail.milage),
    createDescriptionData("price", cardetail.price + " Rs"),
    createDescriptionData("Registration State", cardetail.milage),
    createDescriptionData("seats", cardetail.milage),
    createDescriptionData("transmission Type", cardetail.milage),
    createDescriptionData("Owner Name", cardetail.ownerDetails.user.fullname),
    createDescriptionData("Owner Email", cardetail.ownerDetails.user.email),
    createDescriptionData(
      "Owner Mobile Number",
      cardetail.ownerDetails.user.mobilenumber
    ),
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Mileage ", 159, 6.0, 24, 4.0),
    createData("Ground Clearance ", 237, 9.0, 37, 4.3),
    createData("Engine Type", 262, 16.0, 24, 6.0),
    createData("Fuel Type", 305, 3.7, 67, 4.3),
    createData("Transmission", 356, 16.0, 49, 3.9),
    createData("Airbags", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [open, setOpen] = useState(false);
  const [openreport, setOpenreport] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const handleReadMoreClick = async () => {
    console.log("read more clicked");
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
      const membership = await membershipInfo(token);
      const user = membership.data;
      var newDate = new Date().toISOString();
      if (user.membership === true && user.membershipexpiry > newDate) {
        setExpanded(!expanded);
      } else {
        alert("You are not a member");
        setOpen(true);
      }
    } else {
      console.log("no token");
      alert("login first");
    }
  };

  const handleAccordionExpandClick = async () => {
    console.log("accordion clicked");
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
      const membership = await membershipInfo(token);
      // console.log(membership.data)
      const user = membership.data;
      var newDate = new Date().toISOString();
      if (user.membership === true && user.membershipexpiry > newDate) {
        setExpanded1(!expanded1);
      } else {
        alert("You are not a member");
        setOpen(true);
      }
    } else {
      console.log("no token");
      alert("login first");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseReport = () => {
    setOpenreport(false);
  };

  const getmembership = async (paymentDetails) => {
    console.log(" get membership clicked");
    const token = localStorage.getItem("token");
    // console.log(token)

    // payment api is paytm gateway
    // const makePayment = await payment(token);

    const addPaymentDetails = await addPaymentDetail(paymentDetails);
    console.log("addPaymentDetails", addPaymentDetails);

    const response = await updateMembership(token);
    if (response.data === "membership updated") {
      setOpen(false);
      alert("congrats!! You are a premium member now. ");
      window.location.reload();
    }
  };

  const openReportForm = () => {
    console.log("clicked");
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
      setOpenreport(true);
    } else {
      console.log("no token");
      alert("login first");
    }
  };

  const reportCar = async () => {
    console.log("report car clicked");
    const token = localStorage.getItem("token");
    console.log(reportMessage);
    // console.log(token)
    const carId = cardetail._id;
    console.log(carId);
    const response = await reportCarDetails(token, carId, reportMessage);
    // console.log(response)
    console.log(response.data);
    setOpenreport(false);
    if (response.data === "car reported") {
      alert("car report added successfully");
    }
  };

  const displayRazorPay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay failed to load");
      return;
    }

    const token = localStorage.getItem("token");
    const userData = await getUserInfo(token);
    const userInfo = userData.data;
    const paymentData = await razorpay();
    console.log(paymentData.data);

    const options = {
      key: "rzp_test_ZlmqeEsQ5H3qpM", // Enter the Key ID generated from the Dashboard
      amount: paymentData.data.responce.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: paymentData.data.responce.currency,
      name: "SellYourCar.com",
      description: "Membership for 1 year on SellYourCar.com",
      image: carImage,
      // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        console.log({ response });
        const paymentDetails = {
          username: userInfo.username,
          mobilenumber: userInfo.mobilenumber,
          paymentId: response.razorpay_payment_id,
          email: userInfo.email,
          amount: paymentData.data.responce.amount,
        };
        getmembership(paymentDetails);
      },
      prefill: {
        name: userInfo.fullname,
        email: userInfo.email,
        contact: userInfo.mobilenumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObect = new window.Razorpay(options);
    paymentObect.open();
  };

  return (
    <>
      <Navbar style={{ position: "sticky" }} />
      <Grid
        container
        justify="space-between"
        spacing={2}
        style={{
          padding: "30px",
          width: "100%",
          marginBottom: "none",
          backgroundColor: "white",
        }}
      >
        <Grid item xs={12} md={12}>
          <Card container style={{ color: "red", backgroundColor: "#f1f1f1" }}>
            <CardMedia
              component="img"
              height="500"
              width="100"
              image={cardetail.carImages}
              alt="Car img"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card style={{ backgroundColor: "#757ce8" }}>
            <CardContent>
              <Typography gutterBottom variant="h4">
                Description
                <Button
                  variant="contained"
                  color="success"
                  style={{ float: "right", color: "red" }}
                  onClick={openReportForm}
                >
                  Report
                </Button>
                <Modal
                  open={openreport}
                  onClose={handleCloseReport}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 500 }}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Enter Report Description"
                      style={{ width: 430 }}
                      onChange={(e) => setReportMessage(e.target.value)}
                    />
                    <br></br>
                    <Button size="small" onClick={reportCar}>
                      Report Car
                    </Button>
                  </Box>
                </Modal>
              </Typography>
              <Typography gutterBottom variant="h6">
                Brand Name: {cardetail.brand}
              </Typography>

              <Typography gutterBottom variant="h6">
                Model Name: {cardetail.model}
              </Typography>

              <Typography gutterBottom variant="h6">
                Registration Year: {cardetail.registrationYear}
              </Typography>

              <Typography gutterBottom variant="h6">
                Fuel Type: {cardetail.fuelType}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {cardetail.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                style={{
                  size: "small",
                  color: "#C70A80",
                  backgroundColor: "#A760FF",
                  fontWeight: "bold",
                }}
                onClick={handleReadMoreClick}
              >
                Read More
              </Button>
              {/* <Button size="small" onClick={handleOpen}>Read More</Button> */}
            </CardActions>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 500 }}>
                <h2 id="parent-modal-title">You want to get membership?</h2>
                <br></br>
                <p id="parent-modal-description">
                  Pay Rs.499/- and get membership for 1 year
                </p>
                <br></br>
                <Button size="small" onClick={displayRazorPay}>
                  Get Membership
                </Button>
              </Box>
            </Modal>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          <b>Brand: {cardetail.model}</b>
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right">
                          <b>Value</b>
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows2.map((row) => (
                        <StyledTableRow key={row}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            <b>{row.property}</b>
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right">
                            {row.value}
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>

      {/* accordion */}
      {/* compare cars */}

      <Grid
        container
        item
        xs={12}
        md={12}
        style={{
          backgroundColor: "white",
          paddingRight: "10px",
          marginTop: "-30px",
        }}
      >
        <Accordion
          onClick={handleAccordionExpandClick}
          style={{ margin: "30px", width: "100%", backgroundColor: "blue" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "bold" }}>
              Compare with other sites
            </Typography>
          </AccordionSummary>
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
          <Collapse in={expanded1} timeout="auto" unmountOnExit>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <h2>{cardetail.brand} ( {cardetail.model} )</h2>
                      </TableCell>
                      <TableCell align="right">SellYourCar</TableCell>
                      <TableCell align="right">OLX</TableCell>
                      <TableCell align="right">Carwale</TableCell>
                      <TableCell align="right">Cars24</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Collapse>
        </Accordion>
      </Grid>
    </>
  );
};

export default Cardetail;
