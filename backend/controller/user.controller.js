// import user from '../model/user.schema.js';
import User from '../model/user.schema.js';
import carDetail from '../model/carDetails.js';
import jwt from 'jsonwebtoken';
import path from 'path';
const SECRET_KEY = "THISISMYSECRETKEYFORSELLYOURCARPROJECT"




export const getUser = async (req, res) => {
    // res.status(200).json("get route from user.controller");
    try {
        let user = await User.find();
        // console.log(user);
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}



export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const editUser = async (req, res) => {
    const user = req.body;
    // console.log(user);
    const editUser = new User(user);
    try {
        await User.updateOne({ _id: req.params.id }, editUser);
        res.json(editUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.json("user deleted successfully");
    } catch (error) {
        res.json({ message: error.message });
    }
}





//sellyourcar project controllers 



export const addUser = async (req, res) => {
    //membership details for token may remaining, check it
    console.log("adduser controller enterd");
    const user = req.body;
    const newUser = new User(user);
    try {
        //crete token
        const token = jwt.sign({ user: newUser }, SECRET_KEY);
        //add token value to user
        newUser.token = token;
        console.log(newUser);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const authUser = async (req, res) => {
    // res.send("auth route from user.controller");
    console.log("auth user enterd");
    const userLoginDetails = req.body;
    console.log(userLoginDetails);
    try {
        const user = await User.findOne({ username: userLoginDetails.username });
        console.log("user found, user is " + user);
        if (!user) {
            console.log("user not found");
            res.json({message : "user not found"});
        }
        else {
            if (user.password === userLoginDetails.password) {
                console.log("password matched");
                // console.log(user.token);
                res.json(user);

            }
            else {
                console.log("password not matched");
                res.json({ message: "password not match" });

            }
        }
    } catch (error) {
        // res.json({message : error.message});
        res.json({ message: "user not found catch block" });

    }
}

export const getCars = async (req, res) => {
    // console.log("getCar from usercontroller");
    // res.send("getCars route from user.controller");
    try {
        let car = await carDetail.find();
        // console.log(user);
        res.json(car);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const addCar = async (req, res) => {
    console.log("addCar controller enterd");
    const car = req.body;
    //decrypt token
    const decoded = jwt.verify(car.ownerDetails, SECRET_KEY);
    const user = await User.findById(decoded.user._id);
    car.ownerDetails = decoded;
    const newCar = new carDetail(car);
    const userCarId = newCar._id;
    await User.updateOne({ _id: user._id }, { $push: { carId: userCarId } });

    try {
        await newCar.save();
        res.json(newCar);
    } catch (error) {
        res.json({ message: "error while uploading cardetails" });
    }
}


//add car controller after using uploadfile middleware
// export const addCar = async (req, res) => {
//     console.log("addCar controller enterd");
//     // const car = req.body;
//     // console.log(car);  
//     // const newCar = new carDetail(car);
//     console.log(req.file);

//     try {
//         // console.log(car)
//         // console.log(req.file);

//         // let filesAarray = [];
//         // req.files.forEach(element => {
//         //     const file = {
//         //         // fileName: element.originalname,
//         //         carImages: element.path,
//         //         // fileType:element.mimetype
//         //     }
//         //     filesAarray.push(file);
//         // });
//         // console.log(filesAarray);

//         const newCar = new carDetail({
//             brand: req.body.brand,
//             model: req.body.model,
//             registrationYear: req.body.registrationYear,
//             fuelType: req.body.fuelType,
//             transmissionType: req.body.transmissionType,
//             registrationState: req.body.registrationState,
//             price: req.body.price,
//             carImages: req.file.path,
//         });
//         console.log(newCar);




//         await newCar.save();
//         // console.log(res.json);
//         res.json("uoloaded");
//     } catch (error) {
//         // res.json({ message: error.message });
//         res.json({ message: error});
//     }
// }

   