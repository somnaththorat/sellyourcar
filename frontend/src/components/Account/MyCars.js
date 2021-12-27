import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import { CardActionArea } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router';

import { getUserInfo, getCarInfo, deleteCarFromUser } from '../../api/Api';


const MyCars = () => {
    const [cars, setCars] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const history = useHistory();

    const getInfoOfUser = async () => {
        console.log("mycars.js - getUserInfo()");
        let token = localStorage.getItem('token');
        // console.log(token);
        const response = await getUserInfo(token);
        setUserInfo(response.data);




        setCars([]);
        let carIds = response.data.carId;
        console.log("carIds ", carIds);
        if (carIds.length > 0) {
            const carResponse = await getCarInfo(carIds);
            console.log("carResponce . data ", carResponse);
            setCars(carResponse.data);
        }
    }

    useEffect(() => {
        getInfoOfUser();
    }, []);

    // const getInfoOfUsersCar = async () => {
    //     console.log("mycars.js - getInfoOfUsersCar()");
    //     let carIds = userInfo.carId;
    //     console.log("carIds ",carIds);
    //     const carResponse = await getCarInfo(carIds);
    //     console.log(carResponse.data);
    //     // setCars(carResponse.data);
    // }
    // useEffect(() => {
    //     getInfoOfUsersCar();
    // }, [userInfo]);



    console.log("userInfo", userInfo);
    console.log("userInfo-> carId", userInfo.carId);
    console.log("cars", cars);
    // console.log("userInfo-> carId",userInfo.carId);


    const handleClick = (car) => {
        console.log("mycars.js - handleClick()");
        console.log("car", car);
        history.push({ pathname: `/account/mycar/${car._id}`, state: { car: car } });
    }

    const deleteCar = async (car) => {
        console.log("delete button clicked")
        await deleteCarFromUser(car);
        console.log(cars.length);
        getInfoOfUser();
        // window.location.reload();
    }

    const editProfile = () => {
        console.log("edit profile clicked");
        // console.log("userInfo", userInfo);
        history.push({ pathname: `/account/editprofile`, state: { userInfo: userInfo } });
    }




    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome, {userInfo.fullname}
                        </Typography>
                        <Button color="inherit" onClick={editProfile}>Edit Profile</Button>
                    </Toolbar>
                </AppBar>
            </Box>




            <Grid container spacing={1} style={{ padding: '50px', width: "100%" }}>
                {cars.map((car) => (
                    <Grid item xs={12} sm={4} >
                        <Card container style={{ backgroundColor: '#f1f1f1' }} >
                            <CardActionArea
                                onClick={() => { handleClick(car); }}
                            >
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={car.carImages}
                                    alt="Car img"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {car.model}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b> Brand Name :</b>  {car.brand}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b> Model Name :</b>  {car.model}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* <Button color="red" onClick={console.log("delete car")}>Delete Car</Button> */}
                            <Box display="flex" justifyContent="space-between" p={1}>
                                <Button style={{ color: "green" }} onClick={() => handleClick(car)}>
                                    Edit Details
                                </Button>
                                <Button style={{ color: "red" }} onClick={() => deleteCar(car)}>
                                    Delete
                                </Button>
                            </Box>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default MyCars;
