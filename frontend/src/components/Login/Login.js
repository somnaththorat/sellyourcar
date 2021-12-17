// import React from 'react';
// import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
// import Container from '@material-ui/core/Container';
// import NavLink from 'react-router-dom/NavLink';







// const useStyles = makeStyles({
//     container: {
//         backgroundColor: '#2E8BC0',
//         padding: '20px',
//         shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 10,
//             },
//             shadowOpacity: 0.12,
//             shadowRadius: 60,
//         width: '50%',
//         border: 'black 2px' ,
//         margin: '5% 0 0 25%',
//         '& > *': {
//             marginTop: 20
//         }
//     }
// })

// const Login = () => {

//     const classes = useStyles();

//     const onValueChange = (e) => {
//         console.log();
//     }


//     return (
//         <>
//             {/* <section>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-6 m-auto">
//                             <div className="card mt-5">
//                                 <div className="card-header">
//                                     <h4>Login</h4>
//                                 </div>
//                                 <div className="card-body">
//                                     <form>
//                                         <div className="form-group">
//                                             <label>Email</label>
//                                             <input type="email" className="form-control" placeholder="Email" />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Password</label>
//                                             <input type="password" className="form-control" placeholder="Password" />
//                                         </div>
//                                         <button type="submit" className="btn btn-primary">Login</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </section> */}

//             <Container maxWidth="md" >
//             <FormGroup className={classes.container}>
//                 <Typography variant="h4">Login</Typography>

//                 <FormControl>
//                     <InputLabel htmlFor="my-input">Username</InputLabel>
//                     <Input onChange={(e) => onValueChange(e)} name='username' id="my-input" />
//                 </FormControl>
//                 <FormControl>
//                     <InputLabel htmlFor="my-input">Password</InputLabel>
//                     <Input onChange={(e) => onValueChange(e)} name='password' id="my-input" />
//                 </FormControl>
//                 <FormControl>
//                     <Button variant="contained" color="secondary" >Login</Button>
//                 </FormControl>
//                 <p><NavLink to="/signup">Don't have an Account</NavLink></p>
//             </FormGroup> 
//             </Container>
//         </>
//     )
// }

// export default Login;












import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Checkbox, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { authUser } from '../../api/Api';


const Login = () => {

    const [userLoginDetails, setUserLoginDetails] = useState('');
    const { username, password } = userLoginDetails;
    const history = useHistory();

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setUserLoginDetails({ ...userLoginDetails, [e.target.name]: e.target.value })
    }

    const login = async (e) => {
        e.preventDefault();
        // console.log(userLoginDetails);
        const res = await authUser(userLoginDetails);
        // console.log(res);

        console.log(res);
        console.log(res.data.token);

        if (res.data.message === 'user not found' ) {
            window.alert("user not found");
        }else if(res.data.message === 'password not match' ) {
            window.alert('Password Not Match');
        }else if(res.data.message === 'user not found catch block' ) {
            window.alert('user not found catch block');
        } else {
            // window.alert("Login Successful");
            localStorage.setItem("token", res.data.token);

            // history.push(window.location.reload('/'));
            

            history.push('/');
            window.location.reload();

        }


    }




    const paperStyle = { padding: '20px', height: '60vh', width: 380, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green' }
    const btnStyle = { margin: '20px auto' }
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>SignIn</h2>
                    </Grid>
                    <TextField onChange={(e) => onValueChange(e)} value={username} name="username" label="Username" placeholder="Enter Username" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} value={password} name="password" label="Password" placeholder="Enter Password" type="password" fullWidth required />
                    <FormControlLabel
                        label="Remember me"
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={login}>Login</Button>
                    <Typography color="textSecondary">
                        <Link to="/forgotpassword">Forgot Password</Link>
                    </Typography>
                    <Typography color="textSecondary" >
                        Don't have an Account  ?
                        <Link to="/signup"> Sign Up</Link>
                    </Typography>
                </Paper>
            </Grid>
        </>
    )
}

export default Login;
