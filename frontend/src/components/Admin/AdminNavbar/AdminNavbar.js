import React from 'react';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink, useHistory} from 'react-router-dom';
// import { Avatar, IconButton, MenuItem, Typography } from '@material-ui/core';
// import Box from '@mui/material/Box';
// import Tooltip from '@mui/material/Tooltip';
// import Menu from '@mui/material/Menu';






const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const AdminNavbar = () => {
    //using useEffect to get the token status
    const [loggedIn, setLoggedIn] = useState(false);
    const tokenStatus = () => {
        let response = localStorage.getItem('admintoken');
        console.log(response);
        if (response !== null) {
            setLoggedIn(true);
        }else{
            history.push('/admin/login');
        }
    };

    useEffect(() => {
        tokenStatus();
    }, []);




    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('admintoken');
        setLoggedIn(false);
        history.push('/admin/');
        window.location.reload('/admin');
    }







    return (
        <>
            <input type="checkbox" id="check" />
            <nav >
                {/* <NavLink to="/" className="icon"><b style={{ color: 'red' }}>S</b>ell<b style={{ color: 'red' }}>C</b>ar </NavLink> */}

                <NavLink to="/admin" ><b className="icon">Admin</b></NavLink>
                {/* <div className="search_box"  >
                    <input type="search" placeholder="Search Car" name="search"  />
                    <span className="fa fa-search" ></span>
                </div> */}
                <ol>
                    {/* <li><NavLink to="/sellcar">SellCar</NavLink></li> */}
                    {/* {loggedIn ? <li><NavLink to="/sellcar">SellCar</NavLink></li> : <li><NavLink to="/login">SellCar</NavLink></li>} */}
                    {loggedIn ? <li><NavLink to="/admin/profile" >Profile</NavLink></li> : <li><NavLink to="/admin/login">Account</NavLink></li>}

                    {loggedIn ? <li><NavLink to="/admin" onClick={logout}>Logout</NavLink></li> : <li><NavLink to="/admin/login" >Login</NavLink></li>}
                    
                    {/* {loggedIn ?
                        <li>
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
                    } */}


                </ol>
                <label for="check" className="bar">
                    <span className="fa fa-bars" id="bars"></span>
                    <span className="fa fa-times" id="times"></span>
                </label>
            </nav>
        </>
    )
}

export default AdminNavbar;
