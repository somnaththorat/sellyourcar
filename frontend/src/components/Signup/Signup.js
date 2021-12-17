// import React, { useState } from 'react';
// import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
// import Container from '@material-ui/core/Container';
// import { NavLink } from 'react-router-dom';
// import { addUser } from '../../api/Api';
// import { useHistory } from 'react-router-dom';





// const initialValue = {
//     fullname: '',
//     address: '',
//     mobilenumber: '',
//     email: '',
//     username: '',
//     password: '',
//     category: 'user'
// }

// const useStyles = makeStyles({
//     container: {
//         backgroundColor: '#2E8BC0',
//         padding: '20px',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 10,
//         },
//         shadowOpacity: 0.12,
//         shadowRadius: 60,
//         width: '50%',
//         border: 'black 2px',
//         margin: '5% 0 0 25%',
//         '& > *': {
//             marginTop: 20
//         }
//     },
//     ptag: {
//         align: 'center',
//     }
// })

// const Signup = () => {
//     const [user, setUser] = useState(initialValue);
//     const { fullname, address, mobilenumber, email, username, password, category } = user;
//     const classes = useStyles();
//     let history = useHistory();

//     const onValueChange = (e) => {
//         console.log(e.target.value);
//         setUser({ ...user, [e.target.name]: e.target.value })
//     }



//     const addUserDetails = async () => {
//         console.log("clicked");
//         await addUser(user);
//         history.push('/');
//         // console.log(user);
//     }



//     return (
//         <>


//             <Container maxWidth="md" >
//                 <FormGroup className={classes.container} >
//                     <Typography variant="h4">SignUp</Typography>

//                     <FormControl>
//                         <InputLabel htmlFor="my-input">Full Name</InputLabel>
//                         <Input onChange={(e) => onValueChange(e)} name='fullname' value={fullname} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <InputLabel htmlFor="my-input">Address</InputLabel>
//                         <Input onChange={(e) => onValueChange(e)} name='address' value={address} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <InputLabel htmlFor="my-input">Mobile Number</InputLabel>
//                         <Input onChange={(e) => onValueChange(e)} name='mobilenumber' value={mobilenumber} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <InputLabel htmlFor="my-input">Email</InputLabel>
//                         <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <InputLabel htmlFor="my-input">Username</InputLabel>
//                         <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <InputLabel htmlFor="my-input">Password</InputLabel>
//                         <Input onChange={(e) => onValueChange(e)} name='password' value={password} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <Input type="hidden" name='category' value={category} id="my-input" />
//                     </FormControl>
//                     <FormControl>
//                         <Button variant="contained" type="submit" color="secondary" onClick={() => addUserDetails()}>Sign Up</Button>
//                     </FormControl>
//                     <FormControl>
//                         <p className="ptag"><NavLink to="/login">Already have an Account</NavLink></p>
//                     </FormControl>
//                 </FormGroup>
//             </Container>
//         </>
//     )
// }

// export default Signup;


import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { addUser } from '../../api/Api';



// for dropdown of state and district
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';






const initialValue = {
    fullname: '',
    district: '',
    state: '',
    mobilenumber: '',
    email: '',
    username: '',
    password: '',
}


const Signup = () => {


    const paperStyle = { padding: '20px', height: '80vh', width: 580, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green' }
    const btnStyle = { margin: '20px auto' }

    const [user, setUser] = useState(initialValue);
    const { fullname, district, state, mobilenumber, email, username, password } = user;
    let history = useHistory();

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }



    const addUserDetails = async () => {
        console.log("clicked");
        // console.log(user);
        await addUser(user);
        // history.push('/');
        //  console.log(user);
    }







    // const [age, setAge] = React.useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };




    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Signup</h2>
                    </Grid>

                    <TextField onChange={(e) => onValueChange(e)} name='fullname' value={fullname}   label="Full Name" placeholder="Enter Full Name" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='district' value={district}   label="District" placeholder="Enter District" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='state' value={state}   label="State" placeholder="Enter State" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='mobilenumber' value={mobilenumber}   label="Mobile Number" placeholder="Enter Mobile Number" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='email' value={email}   label="Email" placeholder="Enter Email" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='username' value={username}   label="Username" placeholder="Enter Username" fullWidth required />
                    <TextField onChange={(e) => onValueChange(e)} name='password' value={password}   label="Password" placeholder="Enter Password" type="password" fullWidth required />


                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth required>
                        <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl> */}


                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={() => addUserDetails()}>Register</Button>
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

export default Signup;