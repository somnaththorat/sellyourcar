
import express from 'express';
import {getUser, getUserById, editUser, deleteUser} from '../controller/user.controller.js';
import {addUser, authUser, getCars, addCar, getUserInfo, getCarInfo, editCar, updateUser,
     deleteCarOfUser, forgotPassword, resetPassword, membershipInfo} from '../controller/user.controller.js';
import {uploadfile} from '../middleware/fileUpload.js';
import Authenticate from '../middleware/authenticate.js';

const route = express.Router();


// route.get('/', getUser);
// route.get('/:id', getUserById);
// route.put('/:id', editUser);
// route.delete('/:id', deleteUser); 


//sellyourcar project controllers
route.get('/', getCars);
route.post('/adduser', addUser);
route.post('/auth', authUser);
route.post('/addcar', addCar); 
route.get('/account', getUserInfo); 
route.get('/mycars', getCarInfo); 
route.put('/editcar', editCar); 
route.put('/updateuser', updateUser); 
route.delete('/deletecar', deleteCarOfUser); 
route.post('/forgotpassword', forgotPassword);
route.post('/resetpassword', resetPassword);
route.post('/membershipinfo', membershipInfo);


// route.post('/addcar', uploadfile.single("carImages"), addCar);


  

 
export default route;