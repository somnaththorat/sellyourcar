
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
import {Button} from '@material-ui/core';
import Navbar from '../AdminNavbar/AdminNavbar';
import { deleteReport, fetchAllReports, deleteCar } from '../../../api/Api.js';


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



export default function Reportlist() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const [data, setData] = useState([]);
    const [report, setReport] = useState([]);


    const fetchallreports = async () => {
        const responce = await fetchAllReports();
        // console.log(responce);
        // console.log(responce.data);
        const allreport = responce.data;
        setReport( allreport );
        // console.log(report);
    }

    useEffect(() => {
        fetchallreports();
    },[]);

    // console.log("report ", report);
    



    const deletereport = async (id) => {
        // console.log("delete report id ", id);
        const responce = await deleteReport(id)
        alert(responce.data)
        fetchallreports()
        console.log(responce.data);
    }

    const deletecar = async (id) =>{
        console.log()
        const responce = await deleteCar(id);
        alert(responce.data)
        // if(responce.data !== "deleted") {
        //   deletereport();
        // }
        fetchallreports()
        console.log(responce.data);
    }




let srno = 1
  return (
      <>
      <Navbar/>
      <Grid container style={{ padding: '10px', width: "100%", marginBottom: 'none', backgroundColor: "#7900FF" }} >
                <h2>Report List</h2>
            </Grid>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                        <StyledTableCell>Username of reporter</StyledTableCell>
                        <StyledTableCell>car Id</StyledTableCell>
                        <StyledTableCell>Report Message</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            


              
          {report.map((user) => (
                        <TableRow >
                            <TableCell>{srno++}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.carId}</TableCell>
                            <TableCell>{user.reportMessage}</TableCell>
                            <TableCell>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() =>  deletereport(user._id)}
                                >
                                    Delete Report
                                </Button>{" "}
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() =>  deletecar(user._id)}
                                >
                                    Delete car
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                        
 
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={report.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    </>
  );
}
