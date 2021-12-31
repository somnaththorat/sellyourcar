// import user from '../model/user.schema.js';
import User from '../model/user.schema.js';
import carDetail from '../model/carDetails.js';
import Admin from '../model/admin.schema.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import nodemailer from 'nodemailer';
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
        const token = jwt.sign({ user: user }, SECRET_KEY);
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
            res.json({ message: "user not found" });
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
    console.log("getCar from usercontroller");
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

    try {
        await newCar.save();
        await User.updateOne({ _id: user._id }, { $push: { carId: userCarId } });
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

export const getUserInfo = async (req, res) => {
    console.log("getUserInfo controller entered");
    const token = req.headers.token;
    // console.log(token)
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log(decoded);
    try {
        const user = await User.findById(decoded.user._id);
        // console.log(user);

        //find cars of user using carId array
        // const carIdArray = user.carId;
        // console.log(carIdArray);
        // const carArray = [];
        // if (carIdArray.length > 0) {
        //     carIdArray.forEach(element => {
        //         const car = carDetail.findById(element);
        //         console.log("car",car);
        //         if (car !== null) {
        //             carArray.push(car);   
        //         }
        //     });
        // }
        // console.log("carArray   "+ carArray);     


        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }

}


export const getCarInfo = async (req, res) => {
    // console.log("getCarInfo controller entered");
    const carId = req.headers.carids;
    // console.log(typeof carId);
    // console.log("carIds");
    // console.log(carId);
    //create array of carIds
    const carIdArray = carId.split(",");
    // console.log(carIdArray);

    let carArray = [];

    //find cars of user using carId array and push responce to carArray and set it to the user
    // carIdArray.forEach(async (element) => {
    //     const car = await carDetail.findById(element);
    //     carArray.push(car);
    // });
    // console.log("carArray   "+ carArray);


    // carIdArray.map(async (element) => {
    //     // console.log(element);
    //     const car = await carDetail.findById(element);
    //     carArray.push(car);
    //     // console.log(carArray); //array have values
    // }
    // );


    // console.log(carIdArray.length);
    for (let i = 0; i < carIdArray.length; i++) {
        const car = await carDetail.findById(carIdArray[i]);
        carArray.push(car);
    }
    // console.log(carArray);
    res.json(carArray);


    // carIdArray.forEach(async (element) => {
    //     // console.log(element);
    //     const car = await carDetail.findById(element);
    //     carArray.push(car);
    //     // console.log(carArray); //array have values
    // });

    // console.log("carArray is", carArray);// array dont have values
    // res.json(carArray);



}


export const editCar = async (req, res) => {
    console.log("editCar controller entered");
    const car = req.body;
    const carId = car._id;
    console.log(carId);
    console.log(car);
    try {
        await carDetail.findByIdAndUpdate(carId, car);
        res.json("updated");
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    console.log("updateUser controller entered");
    const user = req.body;
    const userId = user._id;
    console.log(userId);
    console.log(user);
    try {
        const token = jwt.sign({ user: user }, SECRET_KEY);
        user.token = token;
        await User.findByIdAndUpdate(userId, user);
        res.json("updated");
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteCarOfUser = async (req, res) => {
    console.log("deleteCarOfUser controller entered");
    const car = req.body;
    const carId = car._id;
    const userId = car.ownerDetails.user._id;
    // console.log(typeof userId);
    // console.log(userId);
    try {
        if (await User.findByIdAndUpdate(userId, { $pull: { carId: carId } })) {
            console.log("done")
        }
        await carDetail.findByIdAndDelete(carId);
        res.json("deleted");
    } catch (error) {
        res.json({ message: error.message });
    }
}


//forgotPassword
export const forgotPassword = async (req, res) => {
    console.log("forgotPassword controller entered");
    const email = req.body.email;
    console.log(req.body);
    console.log(email);
    try {
        const user = await User.findOne({ email: email });
        // console.log(user);
        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false, // true for 465, false for other ports  
                auth: {
                    user: 'aic.tsomnath@gmail.com',
                    pass: '50mn47h@1398',
                },
            });
            const token = user.token;// change this id for security purpose
            // const token = jwt.sign({ user: user }, SECRET_KEY);
            console.log(token);
            const url = `http://localhost:3000/resetPassword/${token}`;
            const mailOptions = {
                from: '"Sell-Your-Car" <aic.tsomnath@gmail.com>',
                to: email,
                subject: "Reset Password",
                html: `<h1>Reset Password</h1>
                <p>Click on the link to reset your password</p>
                <a href=${url}>Reset Password</a>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json("email sent");
        } else {
            res.json("email not found");
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}


export const resetPassword = async (req, res) => {
    console.log("resetPassword controller entered");
    const info = req.body;
    console.log(info);
    const newPassword = info.password;
    const token = info.token;
    console.log(newPassword);   
    // console.log(token);
    try {
        const user = await User.findOne({ token: token });
        console.log(" user is ",  user);
        if (user) {
            const userId = user._id;
            console.log(userId);
            // const hashedPassword = await bcrypt.hash(newPassword, 10);
            // console.log(hashedPassword);
            await User.findByIdAndUpdate(userId, { password: newPassword });
            const updatedUser = { _id:user._id, fullname: user.fullname, district: user.district, state: user.state, mobilenumber: user.mobilenumber, email: user.email, username: user.username, password: newPassword}
            // console.log(updatedUser);
            const updatedToken = jwt.sign({ user: updatedUser }, SECRET_KEY);
            // console.log(updatedToken);
            await User.findByIdAndUpdate(userId, { token: updatedToken });
            res.json("password updated");
        } else {
            res.json("token not found");
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}
   

export const membershipInfo = async (req, res) => {
    const token = req.body.token;
    // const decoded = jwt.verify(token, SECRET_KEY);
    // console.log(decoded)
    try{
        const user = await User.findOne({ token: token });
        // console.log("user is ", user);
        if (user) {
           res.json(user.membership);
        } else {
            res.json("token not found");
        }
    } catch (error) {
        res.json({ message: error.message });
    }

}


//test it later
export const updateMembership = async (req, res) => {
    console.log("updateMembership controller entered");
    const token = req.body.token;
    try{
        const user = await User.findOne({ token: token });
        // console.log("user is ", user);
        if (user) {
            //add time to make false
            await User.findOneAndUpdate({ user }, { membership: { membership: true, endDate: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)) } });
            res.json("membership updated");
        } else {
            res.json("token not found");
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}




//admin panel controller

export const authAdmin = async (req, res) => {
    console.log("authAdmin controller entered");
    const admin = req.body;
    console.log(admin);
    try {
        const user = await Admin.findOne({ username: admin.username });
        console.log(user);
        if (user) {
            // const isMatch = await match(admin.password, user.password);
            const isMatch = admin.password === user.password;
            if (isMatch) {
                
                res.json({token: user.token});
            } else {
                res.json({ message: "password not match" });
            }
        } else {
            res.json({ message: "user not found" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}




//add alerts
//add comparison of car price
//change navbar
// save image in server and change base64 to image path in db
//search functionality
//cardetails page design
// create admin panel
// add payment gateway
//report car in user  


//admin panel, set default dashboard