import React from 'react';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink, useHistory} from 'react-router-dom';
import { Avatar, IconButton, MenuItem, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';






const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {


    //using useEffect to get the token status
    const [loggedIn, setLoggedIn] = useState(false);
    
    const tokenStatus = () => {
        let response = localStorage.getItem('token');
        console.log(response);
        if (response !== null) {
            setLoggedIn(true);
        }
    };

    useEffect(() => {
        tokenStatus();
    }, []);


   //add search functionality



   


    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
        window.location.reload('/');
    }





    

// console.log("search", search);

    return (
        <>
            <input type="checkbox" id="check" />
            <nav style={{position: "sticky"}}>
                <NavLink to="/" className="icon"><b style={{ color: 'red' }}>S</b>ell<b style={{ color: 'red' }}>C</b>ar</NavLink>
                
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
        </>
    )
}

export default Navbar;
