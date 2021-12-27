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

    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
        window.location.reload('/');
    }






    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const userMenu = (e) => {
    //     console.log('user menu');
    //     setAnchorElUser(e.currentTarget);
    // }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <>
            <input type="checkbox" id="check" />
            <nav >
                <NavLink to="/" className="icon"><b style={{ color: 'red' }}>S</b>ell<b style={{ color: 'red' }}>C</b>ar</NavLink>
                <div className="search_box">
                    <input type="search" placeholder="Search Car" />
                    <span className="fa fa-search"></span>
                </div>
                <ol>
                    {/* <li><NavLink to="/sellcar">SellCar</NavLink></li> */}
                    {loggedIn ? <li><NavLink to="/sellcar">SellCar</NavLink></li> : <li><NavLink to="/login">SellCar</NavLink></li>}
                    {loggedIn ? <li><NavLink to="/account">Account</NavLink></li> : <li><NavLink to="/login">Account</NavLink></li>}

                    {loggedIn ? <li><NavLink to="/" onClick={logout}>Logout</NavLink></li> : <li><NavLink to="/login" >Login</NavLink></li>}
                    {loggedIn ?
                        <li>
                            {/* <Avatar style={{ width: 24, height: 24 }}
                                onClick={console.log("clicked")}
                            />
                            {settings.map((setting) => (
                                <MenuItem key={setting} >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}  */}




                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <Avatar onClick={handleOpenUserMenu} alt="" src="/static/images/avatar/2.jpg" style={{ width: 24, height: 24, cursor: "pointer" }} />
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" >{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>



                        </li> :
                        <li>
                            <NavLink to="/login" >Login</NavLink>
                        </li>
                    }


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
