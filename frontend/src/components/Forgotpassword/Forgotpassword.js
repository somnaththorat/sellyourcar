import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar.js';

import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {forgotPassword} from '../../api/Api';



const Forgotpassword = () => {

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
        await forgotPassword(email);
        // history.push('/account');
    }  


    return (
        <>
        <Navbar />
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Forgot Password</h2>
                    </Grid>

                    
                    <TextField onChange={(e) => onValueChange(e)} name='email' value={email}   label="Email" placeholder="Enter Email" fullWidth required />
                    


                   

                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={() => forgotpassword()}>Send Reset Password Link</Button>
                    
                   
                </Paper>
            </Grid>
        </>
    )
}

export default Forgotpassword;
