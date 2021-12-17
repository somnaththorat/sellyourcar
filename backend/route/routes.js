
import express from 'express';
import {getUser, getUserById, editUser, deleteUser} from '../controller/user.controller.js';
import {addUser, authUser, getCars, addCar} from '../controller/user.controller.js';
import {uploadfile} from '../middleware/fileUpload.js';
import Authenticate from '../middleware/authenticate.js';

const route = express.Router();


// route.get('/', getUser);
route.get('/:id', getUserById);
route.put('/:id', editUser);
route.delete('/:id', deleteUser); 

route.get('/', getCars);
route.post('/adduser', addUser);
route.post('/auth', authUser);
route.post('/addcar', addCar); 
// route.post('/addcar', uploadfile.single("carImages"), addCar);




 
export default route;