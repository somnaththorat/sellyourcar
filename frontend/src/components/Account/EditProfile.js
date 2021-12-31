import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.js';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { updateUser } from '../../api/Api';


// const initialValue = {
//     fullname: '',
//     district: '',
//     state: '',
//     mobilenumber: '',
//     email: '',
//     username: '',
//     password: '',
// }


const EditProfile = (userInfo) => {


    const paperStyle = { padding: '20px', height: '80vh', width: 580, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green' }
    const btnStyle = { margin: '20px auto' }

    const initialValue = {
        _id: userInfo.location.state.userInfo._id,
        fullname: userInfo.location.state.userInfo.fullname,
        district: userInfo.location.state.userInfo.district,
        state: userInfo.location.state.userInfo.state,
        mobilenumber: userInfo.location.state.userInfo.mobilenumber,
        email: userInfo.location.state.userInfo.email,
        username: userInfo.location.state.userInfo.username,
        password: userInfo.location.state.userInfo.password,
    }
    
    // console.log("parameter info", userInfo.location.state.userInfo)

    const [user, setUser] = useState(initialValue);
    const { fullname, district, state, mobilenumber, email, username, password } = user;
    let history = useHistory();

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }



    const updateUserDetails = async () => {
        console.log("clicked");
        console.log(user);
        const responce = await updateUser(user);
        if(responce.data === "updated"){
            alert("User details updated successfully")
        history.push('/account');
        }else{  
            alert("User details not updated")
        }
    }



// console.log("userInfo", userInfo.location.state.userInfo);







    return (
        <>
            <Navbar />
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Edit Profile</h2>
                    </Grid>

                    <TextField onChange={(e) => onValueChange(e)} name='fullname' value={fullname}   label="Full Name" placeholder="Enter Full Name" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='district' value={district}   label="District" placeholder="Enter District" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='state' value={state}   label="State" placeholder="Enter State" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='mobilenumber' value={mobilenumber}   label="Mobile Number" placeholder="Enter Mobile Number" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='email' value={email}   label="Email" placeholder="Enter Email" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='username' value={username}   label="Username" placeholder="Enter Username" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='password' value={password}   label="Password" placeholder="Enter Password" type="password" fullWidth required />


                   

                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={() => updateUserDetails()}>Update Profile</Button>
                    
                   
                </Paper>
            </Grid>
        </>
    )
}

export default EditProfile;