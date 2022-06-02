// import React, { useEffect, useState } from 'react';
// import { fetchAllUsers, deleteUser, fetchAllCars } from '../../../api/Api.js';
// import Navbar from '../AdminNavbar/AdminNavbar';
// import {
//     Table,
//     TableHead,
//     TableCell,
//     TableRow,
//     Button,
//     TableBody,
//     makeStyles,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles({
//     table: {
//         width: "90%",
//         margin: "50px 0 0 50px",
//     },
//     thead: {
//         "& > *": {
//             fontSize: 20,
//             background: "#000000",
//             color: "#FFFFFF",
//         },
//     },
//     row: {
//         "& > *": {
//             fontSize: 18,
//         },
//     },
// });




// const Carlist = () => {

    // const [cars, setCars] = useState([]);
    // const classes = useStyles();


    // const fetchallcars = async () => {
    //     const responce = await fetchAllCars();
    //     // console.log(responce);
    //     console.log(responce.data);
    //     const cars = responce.data;
    //     setCars( cars );
    //     // console.log(data);
    // }

    // useEffect(() => {
    //     fetchallcars();
    // }, []);

//     console.log("cars ", cars);



//     const deleteuser = async (id) => {
//         console.log("delete user id ", id);
//         const responce = await deleteUser(id)
//         console.log(responce.data);
//     }













//     let sr_no = 1;



//     return (
//         <>
//         <Navbar/>
//         <Table className={classes.table}>
//                 <TableHead>
//                     <TableRow className={classes.thead}>
//                         <TableCell>Sr.No.</TableCell>
//                         {/* <TableCell>UserId</TableCell> */}
//                         <TableCell>Car Brand</TableCell>
//                         <TableCell>Car Model</TableCell>
//                         <TableCell>Engine</TableCell>
//                         <TableCell>Fuel Type</TableCell>
//                         <TableCell>transmission Type</TableCell>
//                         <TableCell>Milage</TableCell>
//                         <TableCell>Color</TableCell>
//                         <TableCell>door</TableCell>
//                         <TableCell>Seats</TableCell>
//                         <TableCell>airbag</TableCell>
//                         <TableCell>AC</TableCell>
//                         <TableCell>Acceleration</TableCell>
//                         <TableCell>Driving range</TableCell>
//                         <TableCell>description</TableCell>
//                         <TableCell>Price</TableCell>
//                         <TableCell>Owner</TableCell>

//                         <TableCell>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
                    // {cars.map((car) => (
                    //     <TableRow className={classes.row}>
                    //         <TableCell>{sr_no++}</TableCell>
                    //         {/* <TableCell>{car._id}</TableCell> */}
                    //         <TableCell>{car.brand}</TableCell>
                    //         <TableCell>{car.model}</TableCell>
                    //         <TableCell>{car.engine } </TableCell>
                    //         <TableCell>{car.fuelType}</TableCell>
                    //         <TableCell>{car.transmissionType}</TableCell>
                    //         <TableCell>{car.milage}</TableCell>
                    //         <TableCell>{car.color}</TableCell>
                    //         <TableCell>{car.door}</TableCell>
                    //         <TableCell>{car.seats}</TableCell>
                    //         <TableCell>{car.airbag}</TableCell>
                    //         <TableCell>{car.airconditioning}</TableCell>
                    //         <TableCell>{car.acceleration}</TableCell>
                    //         <TableCell>{car.drivingRange}</TableCell>
                    //         <TableCell>{car.description}</TableCell>
                    //         <TableCell>{car.price}</TableCell>
                    //         <TableCell>{car.milage}</TableCell>
                            
//                             <TableCell>
//                                 {/* <Button
//                                     color="primary"
//                                     variant="contained"
//                                     style={{ marginRight: 10 }}
//                                     component={Link}
//                                     to={`/edit/${user._id}`}
//                                 >
//                                     Edit
//                                 </Button>{" "} */}
//                                 {/* change it to user.id to use JSON Server */}
//                                 <Button
//                                     color="secondary"
//                                     variant="contained"
//                                     // onClick={() =>  deleteuser(user._id)}
//                                 >
//                                     Delete
//                                 </Button>{" "}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </>
//     )
// }

// export default Carlist;























import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Navbar from '../AdminNavbar/AdminNavbar';
import { fetchAllCars } from '../../../api/Api.js';
import { 
  // getUserInfo, 
  // getCarInfo, 
  deleteCarFromUser 
} from '../../../api/Api';
















export default function Carlist() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const [cars, setCars] = useState([]);
// const classes = useStyles();


const fetchallcars = async () => {
    const responce = await fetchAllCars();
    // console.log(responce);
    console.log(responce.data);
    const car = responce.data;
    setCars( car );
    console.log(cars);
}

useEffect(() => {
    fetchallcars();
}, []);



const deleteCar = async (car) => {
  console.log("delete button clicked")
  const res = await deleteCarFromUser(car);
  if(res.data === "deleted"){
    alert("Car deleted successfully");
  }else{
    alert("Car not deleted");
  }
    fetchallcars();
}







let srno = 1
  return (
      <>
      <Navbar/>
      <Grid container style={{ padding: '10px', width: "100%", marginBottom: 'none', backgroundColor: "#7900FF" }} >
                <h2>Car List</h2>
            </Grid>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow >
              {/* {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))} */}

              
                        <TableCell>Sr.No</TableCell>
                        <TableCell>Car Brand</TableCell>
                        <TableCell>Car Model</TableCell>
                        <TableCell>Engine</TableCell>
                        <TableCell>Fuel Type</TableCell>
                        <TableCell>transmission Type</TableCell>
                        <TableCell>Milage</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>door</TableCell>
                        <TableCell>Seats</TableCell>
                        <TableCell>airbag</TableCell>
                        <TableCell>AC</TableCell>
                        <TableCell>Acceleration</TableCell>
                        <TableCell>Driving range</TableCell>
                        <TableCell>description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Owner Name</TableCell>
                        <TableCell>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            


              
                {cars.map((car) => (
                  <TableRow >
                    <TableCell>{srno++}</TableCell>
                    {/* <TableCell>{car._id}</TableCell> */}
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.engine } </TableCell>
                    <TableCell>{car.fuelType}</TableCell>
                    <TableCell>{car.transmissionType}</TableCell>
                    <TableCell>{car.milage} /Ltr.</TableCell>
                    <TableCell>{car.color}</TableCell>
                    <TableCell>{car.doors}</TableCell>
                    <TableCell>{car.seats}</TableCell>
                    <TableCell>{car.airbags}</TableCell>
                    <TableCell>{car.airconditioning  === true ? "Yes" :"No" }</TableCell>
                    <TableCell>{car.acceleration} sec (0-100 KM/Hr)</TableCell>
                    <TableCell>{car.drivingrange}</TableCell>
                    <TableCell>{car.description}</TableCell>
                    <TableCell>{car.price } RS</TableCell>
                    <TableCell>{car.ownerDetails.user.fullname}</TableCell>
                    <TableCell><Button
                                            color="secondary"
                                            variant="contained"
                                            onClick={() => deleteCar(car)}
                                        >
                                            Delete
                                        </Button></TableCell>
                  </TableRow>
                ))}
                        

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={cars.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    </>
  );
}
