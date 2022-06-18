import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
// import {Button} from '@material-ui/core';
import Navbar from "../AdminNavbar/AdminNavbar";
import {
  // deleteReport, fetchAllReports, deleteCar,
  fetchAllPayment,
} from "../../../api/Api.js";

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

export default function Paymentlist() {
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
  // const [report, setReport] = useState([]);
  const [payment, setPayment] = useState([]);

  // const fetchallreports = async () => {
  //     const responce = await fetchAllReports();
  //     // console.log(responce);
  //     // console.log(responce.data);
  //     const allreport = responce.data;
  //     setReport( allreport );
  //     // console.log(report);
  // }
  const fetchallpayments = async () => {
    const responce = await fetchAllPayment();
    const allpayment = responce.data;
    setPayment(allpayment);
    // console.log("payment", payment);
  };

  useEffect(() => {
    fetchallpayments();
  }, []);

  // console.log("report ", report);
  // console.log("payment ", payment);

  // const deletereport = async (id) => {
  //     // console.log("delete report id ", id);
  //     const responce = await deleteReport(id)
  //     alert(responce.data)
  //     fetchallreports()
  //     console.log(responce.data);
  // }

  // const deletecar = async (id) =>{
  //     console.log()
  //     const responce = await deleteCar(id);
  //     alert(responce.data)
  //     // if(responce.data !== "deleted") {
  //     //   deletereport();
  //     // }
  //     fetchallreports()
  //     console.log(responce.data);
  // }

  let srno = 1;
  return (
    <>
      <Navbar />
      <Grid
        container
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "none",
          backgroundColor: "#7900FF",
        }}
      >
        <h2>Payment List</h2>
      </Grid>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ backgroundColor: "black" }}>
              <TableRow>
                <StyledTableCell>Sr.No</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Payment Id</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Expiry of Membership</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Mobile Number</StyledTableCell>
                {/* <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {payment.map((payment) => (
                <TableRow>
                  <TableCell>{srno++}</TableCell>
                  <TableCell>{payment.username}</TableCell>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.expiresAt}</TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>{payment.mobilenumber}</TableCell>
                  {/* <TableCell>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() =>  deletereport(payment._id)}
                                >
                                    Delete Report
                                </Button>{" "}
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() =>  deletecar(payment._id)}
                                >
                                    Delete car
                                </Button>
                            </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={payment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
