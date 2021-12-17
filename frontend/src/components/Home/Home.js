import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
import CarList from './CarList';
import { getCars } from '../../api/Api';






const Home = () => {
    const [cars2, setCars2] = useState([]);
    const getAllCars = async () => {
        let response = await getCars();
        console.log("home.js-getallcars()");
        // console.log(response.data);

        setCars2(response.data);
    };

    useEffect(() => {
        getAllCars();
    },[]);

    //reverse cars array
    const cars = [...cars2].reverse();
    console.log(cars);

    return (
        <>

            <Grid container spacing={1} style={{ padding: '50px', width: "100%" }}>
                {cars.map((car) => (
                    <Grid key={car._id} item xs={12} sm={4} >
                        <CarList car={car} />
                    </Grid>
                ))}

            </Grid>

        </>
    )

}

export default Home;  