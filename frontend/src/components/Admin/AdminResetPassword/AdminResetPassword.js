import React, {useState} from 'react';
// import AdminNavbar from '../AdminNavbar/AdminNavbar';

import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {resetAdminPassword} from '../../../api/Api.js';
import { useParams } from 'react-router-dom';



const AdminResetPassword = () => {

    const paperStyle = { padding: '20px', height: '50vh', width: 580, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green' }
    const btnStyle = { margin: '20px auto' }

    const [password, setPassword] = useState('');
    const { pass, conpass} = password;

    const onValueChange = (e) => {
        // console.log(e.target.value);
        // setPassword(...password, e.target.value)
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

        const params = useParams();


    const resetpassword = async () => {
        console.log("reset password clicked");
        const token = params.id;
        // console.log(pass, token);


        if(pass === conpass && pass != null){
            alert("Password matched")
            //send token with resetPassword


            const rp = await resetAdminPassword(pass, token);
            console.log(rp);
            console.log(rp.data);
            if(rp.data === "password updated"){
                alert("Password changed successfully")
                window.location.href = "/admin/login";
            }else{
                alert("Link Expired")
            }

        }else{
            alert("Password not matched");
        }

    
    }  


    return (
        <>
            {/* <Navbar /> */}
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Admin Reset Password</h2>
                    </Grid>

                    
                    <TextField onChange={(e) => onValueChange(e)} name='pass' value={pass}   label="Password" placeholder="Password" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='conpass' value={conpass}   label="Confirm Password" placeholder="Confirm Password" fullWidth required />
                    


                   

                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={() => resetpassword()}>Reset Password</Button>
                    
                   
                </Paper>
            </Grid>
        </>
    )
}

export default AdminResetPassword;
