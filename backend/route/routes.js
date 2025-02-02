
import express from 'express';
// import {getUser, getUserById, editUser, deleteUser} from '../controller/user.controller.js';
import {addUser, authUser, getCars, addCar, getUserInfo, getCarInfo, editCar, updateUser,
     deleteCarOfUser, forgotPassword, resetPassword, membershipInfo, updateMembership, reportCarDetails,
     authAdmin, getAllUsers, deleteUser, getAllCars, getAllReports, deleteReport, deleteCarFromReport,
     getAdminDetails, updateAdminDetails, forgotAdminPassword, resetAdminPassword, payment, razorpay, addPaymentDetail, getAllPayments,
     fetchOlxData, fetchCarwaleData, test,
} from '../controller/user.controller.js';
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
route.post('/payment', payment);
route.post('/razorpay', razorpay);
route.post('/updatemembership', updateMembership);
route.post('/reportcardetails', reportCarDetails);

route.post('/olxdata', fetchOlxData)
route.post('/carwaledata', fetchCarwaleData)

//admin controllers
route.post('/authadmin', authAdmin);
route.get('/getusers', getAllUsers);
route.delete('/deleteuser/:id', deleteUser);
route.get('/getcars', getAllCars);
route.get('/getreports', getAllReports);
route.delete('/deletereport/:id', deleteReport);
route.delete('/deletecarfromreport/:id', deleteCarFromReport);
route.get('/getpayments', getAllPayments);
route.get('/admininfo', getAdminDetails);
route.put('/updateadmin', updateAdminDetails);
route.post('/forgotadminpassword', forgotAdminPassword);
route.post('/resetadminpassword', resetAdminPassword);


route.post('/addpaymentdetail', addPaymentDetail);

//for testing purpose, use this route
route.get('/test', test);





// route.post('/addcar', uploadfile.single("carImages"), addCar);


  

 
export default route;