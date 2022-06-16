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



import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    }));












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
    // console.log(responce.data);
    const car = responce.data;
    setCars( car );
    // console.log(cars);
}

useEffect(() => {
    fetchallcars();
},[]);



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

              
                        <StyledTableCell>Sr.No</StyledTableCell>
                        <StyledTableCell>Car Brand</StyledTableCell>
                        <StyledTableCell>Car Model</StyledTableCell>
                        <StyledTableCell>Engine</StyledTableCell>
                        <StyledTableCell>Fuel Type</StyledTableCell>
                        <StyledTableCell>transmission Type</StyledTableCell>
                        <StyledTableCell>Milage</StyledTableCell>
                        <StyledTableCell>Color</StyledTableCell>
                        <StyledTableCell>door</StyledTableCell>
                        <StyledTableCell>Seats</StyledTableCell>
                        <StyledTableCell>airbag</StyledTableCell>
                        <StyledTableCell>AC</StyledTableCell>
                        <StyledTableCell>Acceleration</StyledTableCell>
                        <StyledTableCell>Driving range</StyledTableCell>
                        <StyledTableCell>description</StyledTableCell>
                        <StyledTableCell>Price</StyledTableCell>
                        <StyledTableCell>Owner Name</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>

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
