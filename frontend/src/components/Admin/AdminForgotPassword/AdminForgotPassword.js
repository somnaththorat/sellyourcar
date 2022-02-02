import React, {useState, useEffect} from 'react';
// import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { useHistory, NavLink } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {forgotAdminPassword} from '../../../api/Api';



const AdminForgotPassword = () => {

    const paperStyle = { padding: '20px', height: '50vh', width: 580, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green' }
    const btnStyle = { margin: '20px auto' }

    const [email, setEmail] = useState('');

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value)
    }

    const forgotpassword = async () => {
        console.log("clicked");
        console.log(email);
        const responce = await forgotAdminPassword(email);
        if(responce.data === "email sent"){
            alert("Email sent, check your mail");
        }else{
            alert("Email not found")
        }
        // history.push('/account');
    } 




    const [loggedIn, setLoggedIn] = useState(false);
    const tokenStatus = () => {
        let response = localStorage.getItem('admintoken');
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
        localStorage.removeItem('admintoken');
        setLoggedIn(false);
        history.push('/admin/');
        window.location.reload('/admin');
    }









    return (
        <>
        

        
        <input type="checkbox" id="check" />
            <nav >

                <NavLink to="/admin" ><b className="icon">Admin</b></NavLink>
                
                <ol>
                    
                    {loggedIn ? <li><NavLink to="/admin/profile" >Profile</NavLink></li> : <li><NavLink to="/admin/login">Account</NavLink></li>}

                    {loggedIn ? <li><NavLink to="/admin" onClick={logout}>Logout</NavLink></li> : <li><NavLink to="/admin/login" >Login</NavLink></li>}
                    
                </ol>
                <label for="check" className="bar">
                    <span className="fa fa-bars" id="bars"></span>
                    <span className="fa fa-times" id="times"></span>
                </label>
            </nav>






















            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Admin Forgot Password</h2>
                    </Grid>

                    
                    <TextField onChange={(e) => onValueChange(e)} name='email' value={email}   label="Email" placeholder="Enter Email" fullWidth required />
                    


                   

                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={() => forgotpassword()}>Send Reset Password Link</Button>
                    
                   
                </Paper>
            </Grid>
        </>
    )
}

export default AdminForgotPassword;
