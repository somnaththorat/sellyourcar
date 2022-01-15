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



const columns = [
  { id: 'brand', label: 'Brand', minWidth: 170 },
  { id: 'model', label: 'Model', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },


//                         {/* <TableCell>UserId</TableCell> */}
                        // <TableCell>Car Brand</TableCell>
                        // <TableCell>Car Model</TableCell>
                        // <TableCell>Engine</TableCell>
                        // <TableCell>Fuel Type</TableCell>
                        // <TableCell>transmission Type</TableCell>
                        // <TableCell>Milage</TableCell>
                        // <TableCell>Color</TableCell>
                        // <TableCell>door</TableCell>
                        // <TableCell>Seats</TableCell>
                        // <TableCell>airbag</TableCell>
                        // <TableCell>AC</TableCell>
                        // <TableCell>Acceleration</TableCell>
                        // <TableCell>Driving range</TableCell>
                        // <TableCell>description</TableCell>
                        // <TableCell>Price</TableCell>
                        // <TableCell>Owner</TableCell>



  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];












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
