import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar.js';
import { Grid } from '@material-ui/core';
import CarList from './CarList';
import { getCars } from '../../api/Api';
import { NavLink, useHistory} from 'react-router-dom';


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
    // console.log(cars);













    const [loggedIn, setLoggedIn] = useState(false);
    const tokenStatus = () => {
        let response = localStorage.getItem('token');
        // console.log(response);
        if (response !== null) {
            setLoggedIn(true);
        }
    };

    useEffect(() => {
        tokenStatus();
    });


   //add search functionality



   


    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
        window.location.reload('/');
    }



    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [search, setSearch] = React.useState('');

   

// console.log("search", search);












    return (
        <>
            <input type="checkbox" id="check" />
            <nav style={{position: "sticky"}}>
                
                <NavLink to="/" className="icon"><span style={{ color: 'red' }}>S</span>ell<span style={{ color: 'red' }}>Y</span>our<span style={{ color: 'red' }}>C</span>ar</NavLink>
                <div className="search_box"  >
                    <input type="text" placeholder="Search Car" name="search" onChange={e=> setSearch(e.target.value)} />
                    <span className="fa fa-search" ></span>
                </div>
                <ol>
                    {/* <li><NavLink to="/sellcar">SellCar</NavLink></li> */}
                    {loggedIn ? <li><NavLink to="/sellcar">SellCar</NavLink></li> : <li><NavLink to="/login">SellCar</NavLink></li>}
                    {loggedIn ? <li><NavLink to="/account">Account</NavLink></li> : <li><NavLink to="/login">Account</NavLink></li>}

                    {loggedIn ? <li><NavLink to="/" onClick={logout}>Logout</NavLink></li> : <li><NavLink to="/login" >Login</NavLink></li>}
                    


                </ol>
                <label for="check" className="bar">
                    <span className="fa fa-bars" id="bars"></span>
                    <span className="fa fa-times" id="times"></span>
                </label>
            </nav>
            <Grid container spacing={1} style={{ padding: '50px', width: "100%" }}>
                {cars.filter((val)=> {
                    if(search === ''){
                        return val;
                    }else if(val.brand.toLowerCase().includes(search.toLowerCase())){
                        return val;
                    }else if(val.model.toLowerCase().includes(search.toLowerCase())){
                        return val;
                    }
                }).map((car) => (
                    <Grid key={car._id} item xs={12} sm={4} >
                        <CarList car={car} />
                    </Grid>
                ))}

            </Grid>

        </>
    )

}

export default Home;  