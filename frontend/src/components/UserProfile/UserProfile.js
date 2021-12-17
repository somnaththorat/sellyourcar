import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
// import { addUser } from '../../api/Api';






const initialValue = {
    fullname: '',
    district: '',
    state: '',
    mobilenumber: '',
    email: '',
    username: '',
    password: '',
}
const UserProfile = () => {
    
    
    const [user, setUser] = useState(initialValue);
    const { fullname, district, state, mobilenumber, email, username, password } = user;
    let history = useHistory();

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }



    const updateUserDetails = async () => {
        console.log("clicked");
        // console.log(user);
        // await addUser(user);
        // history.push('/');
        //  console.log(user);
    }
    
    
    
     
    
    
    return (
        <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Update Details</h2>
                </Grid>

                <TextField onChange={(e) => onValueChange(e)} name='fullname' value={fullname}   label="Full Name" placeholder="Enter Full Name" fullWidth required />
                <TextField onChange={(e) => onValueChange(e)} name='district' value={district}   label="District" placeholder="Enter District" fullWidth required />
                <TextField onChange={(e) => onValueChange(e)} name='state' value={state}   label="State" placeholder="Enter State" fullWidth required />
                <TextField onChange={(e) => onValueChange(e)} name='mobilenumber' value={mobilenumber}   label="Mobile Number" placeholder="Enter Mobile Number" fullWidth required />
                <TextField onChange={(e) => onValueChange(e)} name='email' value={email}   label="Email" placeholder="Enter Email" fullWidth required />
                <TextField onChange={(e) => onValueChange(e)} name='username' value={username}   label="Username" placeholder="Enter Username" fullWidth required />
                <TextField onChange={(e) => onValueChange(e)} name='password' value={password}   label="Password" placeholder="Enter Password" type="password" fullWidth required />


               


                <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={() => updateUserDetails()}>Register</Button>
                {/* <Typography color="textSecondary">
                    <Link to="/forgotpassword">Forgot Password</Link>
                </Typography> */}
                <Typography color="textSecondary" >
                    Already have an Account  ?
                    <Link to="/login"> Sign In</Link>
                </Typography>
            </Paper>
        </Grid>
    </>
    )
}

export default UserProfile;
