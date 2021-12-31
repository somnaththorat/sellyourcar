import React, { useEffect } from 'react';
import {membershipInfo} from '../../api/Api.js';
// import axios from 'axios';
import { Grid } from '@material-ui/core';
import { Card, CardMedia } from '@material-ui/core';
import { Button, CardActions, CardContent, Typography } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Collapse from '@mui/material/Collapse';

//for table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const Cardetail = (car) => {

    // const [cardetail, setCardetails] = useState(car.location.state.car);
    const cardetail = car.location.state.car;
    // console.log(cardetail);

    // console.log("user info", cardetail.ownerDetails);
    const ownerDetails = cardetail.ownerDetails.user;


  

    useEffect(() => {
        // fetchCarDetails();
    }, []);






    //olx api
    // const searchcarname = cardetail.model.replace(/ /g, '')
    // console.log(searchcarname);

    // const olxUrl = "https://www.olx.in/items/q-"+searchcarname+"?isSearchCall=true";
    // console.log(olxUrl);
    // useEffect(() => {
    //     carDetailsWithFetch();
    // }, []);

    // const carDetailsWithFetch = async () => {
    //     const response = await fetch(olxUrl);
    //     const jsonData = await response.json();
    //     console.log(jsonData);
    // };







    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Mileage ', 159, 6.0, 24, 4.0),
        createData('Ground Clearance ', 237, 9.0, 37, 4.3),
        createData('Engine Type', 262, 16.0, 24, 6.0),
        createData('Fuel Type', 305, 3.7, 67, 4.3),
        createData('Transmission', 356, 16.0, 49, 3.9),
        createData('Airbags', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];




    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = async () => {
        console.log("clicked")
        const token = localStorage.getItem('token')
        // console.log(token)
        if(token){
            const membership = await membershipInfo(token);
            if(membership.data){
                setExpanded(!expanded);
            }else{
                alert("You are not a member")
            }

            
        }else{
            console.log("no token")
            alert("login first")
        }
    };








    return (
        <>
            <Grid container justify="space-between" spacing={2} style={{ padding: '30px', width: "100%", marginBottom: 'none', backgroundColor: "red" }} >
                <Grid item xs={12} md={8} >
                    <Card container style={{ color: 'red', backgroundColor: '#f1f1f1' }} >
                        <CardMedia
                            component="img"
                            height="490"
                            width="100px"
                            image={cardetail.carImages}
                            alt="Car img"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}  >
                    <Card style={{ backgroundColor: '#757ce8' }} >
                        <CardContent >
                            <div className="container">heading<div align="right">data</div></div>

                            <Typography gutterBottom variant="h4"  >
                                Description
                            </Typography>
                            <Typography gutterBottom variant="h6" >
                                Brand Name: {cardetail.brand}
                            </Typography>

                            <Typography gutterBottom variant="h6" >
                                Model Name:  {cardetail.model}
                            </Typography>

                            <Typography gutterBottom variant="h6" >
                                Registration Year:  {cardetail.registrationYear}
                            </Typography>

                            <Typography gutterBottom variant="h6" >
                                Transmission Type:  {cardetail.transmissionType}
                            </Typography>

                            <Typography gutterBottom variant="h6" >
                                Fuel Type:  {cardetail.fuelType}
                            </Typography>

                            <Typography gutterBottom variant="h6" >
                                Registration State:  {cardetail.registrationState}
                            </Typography>
                            {/* <Typography gutterBottom variant="h6" >
                                Price:  {cardetail.brand}
                            </Typography>
                            <Typography gutterBottom variant="body" >
                                ownerDetails.email:  {ownerDetails.email}
                            </Typography> */}







                            <Typography variant="body2" color="text.secondary">
                                Small description about the car
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleExpandClick}>Read More</Button>
                        </CardActions>

                        
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                </Grid>
            </Grid>


            {/* accordion */}
            {/* compare cars */}

            <Grid container item xs={12} md={12} style={{ backgroundColor: "none", paddingRight: '10px', marginTop: '-30px' }}>
                <Accordion style={{ margin: '30px', width: "100%", backgroundColor: "blue" }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Compare</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><h3>{cardetail.model}</h3></TableCell>
                                        <TableCell align="right">SellYourCar</TableCell>
                                        <TableCell align="right">OLX</TableCell>
                                        <TableCell align="right">Carwale</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                </Accordion>
            </Grid>
        </>
    )
}

export default Cardetail;
