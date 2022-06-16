// import React, { useEffect, useState } from 'react';
// import { fetchAllUsers, deleteUser } from '../../../api/Api.js';
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




// const Userlist = () => {

// const [data, setData] = useState([]);
// const [users, setUsers] = useState([]);
// const classes = useStyles();


// const fetchallusers = async () => {
//     const responce = await fetchAllUsers();
//     // console.log(responce);
//     console.log(responce.data);
//     const allUsers = responce.data;
//     setUsers( allUsers );
//     // console.log(data);
// }

// useEffect(() => {
//     fetchallusers();
// }, []);

// console.log("users ", users);
// console.log("users membership", users._id);



// const deleteuser = async (id) => {
//     console.log("delete user id ", id);
//     const responce = await deleteUser(id)
//     console.log(responce.data);
// }













//     let sr_no = 1;



//     return (
//         <>
//         <Navbar/>
//         <Table className={classes.table}>
//                 <TableHead>
//                     <TableRow className={classes.thead}>
//                         <TableCell>Sr.No.</TableCell>
//                         {/* <TableCell>UserId</TableCell> */}
// <TableCell>Username</TableCell>
// <TableCell>FullName</TableCell>
// <TableCell>Address</TableCell>
// <TableCell>Email</TableCell>
// <TableCell>Phone</TableCell>
// <TableCell>Cars</TableCell>
// <TableCell>Membership</TableCell>
// <TableCell>Membership Expiry</TableCell>
// <TableCell>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {users.map((user) => (
//                         <TableRow className={classes.row}>
//                             <TableCell>{sr_no++}</TableCell>
//                             {/* <TableCell>{user._id}</TableCell> */}
//                             <TableCell>{user.username}</TableCell>
//                             <TableCell>{user.fullname}</TableCell>
//                             <TableCell>{user.district } ({user.state})</TableCell>
//                             <TableCell>{user.email}</TableCell>
//                             <TableCell>{user.mobilenumber}</TableCell>
//                             <TableCell>{user.carId.length}</TableCell>
//                             <TableCell>{user.membership === true ? "Yes" :"No" }</TableCell>
//                             <TableCell>{user.membershipexpiry}</TableCell>
//                             {/* <TableCell>{user.membershipexpiry.getFullYear() ,+'-' + (user.membershipexpiry.getMonth()+1) + '-'+user.membershipexpiry.getDate()}</TableCell> */}

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
//                                     onClick={() =>  deleteuser(user._id)}
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

// export default Userlist;







import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Navbar from '../AdminNavbar/AdminNavbar';
import { fetchAllUsers, deleteUser } from '../../../api/Api.js';

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




export default function Userlist() {
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
    const [users, setUsers] = useState([]);


    const fetchallusers = async () => {
        const responce = await fetchAllUsers();
        // console.log(responce);
        // console.log(responce.data);
        const allUsers = responce.data;
        setUsers(allUsers);
        // console.log(data);
    }

    useEffect(() => {
        fetchallusers();
    },[]);

    // console.log("users ", users);
    // console.log("users._id", users.fullname);



    const deleteuser = async (id) => {
        console.log("delete user id ", id);
        const responce = await deleteUser(id)
        console.log(responce.data);
    }




    let srno = 1
    return (
        <>
            <Navbar />
            <Grid container style={{ padding: '10px', width: "100%", marginBottom: 'none', backgroundColor: "#7900FF" }} >
                <h2>User List</h2>
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
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>FullName</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Cars</StyledTableCell>
                                <StyledTableCell>Membership</StyledTableCell>
                                <StyledTableCell>Membership Expiry</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>




                            {users.map((user) => (
                                <TableRow >
                                    <TableCell>{srno++}</TableCell>
                                    {/* <TableCell>{user._id}</TableCell> */}
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.fullname}</TableCell>
                                    <TableCell>{user.district} ({user.state})</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.mobilenumber}</TableCell>
                                    <TableCell>{user.carId.length}</TableCell>
                                    <TableCell>{user.membership === true ? "Yes" : "No"}</TableCell>
                                    <TableCell>{user.membershipexpiry}</TableCell>
                                    {/* <TableCell>{user.membershipexpiry.getFullYear() ,+'-' + (user.membershipexpiry.getMonth()+1) + '-'+user.membershipexpiry.getDate()}</TableCell> */}

                                    <TableCell>
                                        {/* <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ marginRight: 10 }}
                                    component={Link}
                                    to={`/edit/${user._id}`}
                                >
                                    Edit
                                </Button>{" "} */}
                                        {/* change it to user.id to use JSON Server */}
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            onClick={() => deleteuser(user._id)}
                                        >
                                            Delete
                                        </Button>{" "}
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>
    );
}
