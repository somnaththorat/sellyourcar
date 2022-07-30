// import user from '../model/user.schema.js';
import User from "../model/user.schema.js";
import carDetail from "../model/carDetails.js";
import Admin from "../model/admin.schema.js";
import Report from "../model/carReport.js";
import Payment from "../model/paymentDetails.js";
import jwt from "jsonwebtoken";
import path from "path";
import nodemailer from "nodemailer";
import CarDetail from "../model/carDetails.js";
import * as PaytmChecksum from "../paytm/PaytmChecksum.js";
import { v4 as uuidv4 } from "uuid";
const SECRET_KEY = "THISISMYSECRETKEYFORSELLYOURCARPROJECT";
import Razorpay from "razorpay";
import puppeteer from "puppeteer-core";




export const getUser = async (req, res) => {
  // res.status(200).json("get route from user.controller");
  try {
    let user = await User.find();
    // console.log(user);
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

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
};

// export const deleteUser = async (req, res) => {
//     try {
//         await User.deleteOne({ _id: req.params.id });
//         res.json("user deleted successfully");
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }

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
};

export const deleteUser = async (req, res) => {
  console.log("delete user controller enterd");

  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findById(id);
    console.log(user);
    //delete cars of user
    for (const element of user.carId) {
      await carDetail.deleteOne({ _id: element });
    }

    // user.carId.forEach(element => {
    //     await carDetail.deleteOne({ _id: element });
    // });

    //delete user
    await User.deleteOne({ _id: id });
    res.json("user deleted successfully");
  } catch (error) {
    res.json({ message: error.message });
  }
};

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
    } else {
      if (user.password === userLoginDetails.password) {
        console.log("password matched");
        // console.log(user.token);
        res.json(user);
      } else {
        console.log("password not matched");
        res.json({ message: "password not match" });
      }
    }
  } catch (error) {
    // res.json({message : error.message});
    res.json({ message: "user not found catch block" });
  }
};

export const getCars = async (req, res) => {
  console.log("getCars from usercontroller");
  // res.send("getCars route from user.controller");
  try {
    let car = await carDetail.find();
    // console.log(user);
    res.json(car);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const addCar = async (req, res) => {
  console.log("addCar controller enterd");
  const car = req.body;
  // console.log(car);
  const decoded = jwt.verify(car.ownerDetails, SECRET_KEY);
  // console.log(decoded)
  const user = await User.findById(decoded.user._id);
  // console.log("user is ", user)
  car.ownerDetails = decoded;
  const newCar = new carDetail(car);
  // console.log("newcar ",newCar)
  const userCarId = newCar._id;
  // console.log("usercarid is ",userCarId)

  try {
    await newCar.save();
    await User.updateOne({ _id: user._id }, { $push: { carId: userCarId } });
    res.json(newCar);
  } catch (error) {
    // res.json({ message: "error while uploading cardetails" });
    res.json(error.message);
  }
};

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
  // console.log("token ",token)
  const decoded = jwt.verify(token, SECRET_KEY);
  // console.log(decoded);
  try {
    // const user = await User.findById(decoded.user._id);
    const user = await User.findOne({ token: token });

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
};

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
};

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
};

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
};

export const deleteCarOfUser = async (req, res) => {
  console.log("deleteCarOfUser controller entered");
  const car = req.body;
  const carId = car._id;
  const userId = car.ownerDetails.user._id;
  // console.log(typeof userId);
  // console.log(userId);
  try {
    if (await User.findByIdAndUpdate(userId, { $pull: { carId: carId } })) {
      console.log("done");
    }
    await carDetail.findByIdAndDelete(carId);
    res.json("deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
};

//forgotPassword
export const forgotPassword = async (req, res) => {
  console.log("forgotPassword controller entered");
  const email = req.body.email;
  // console.log(req.body);
  // console.log(email);
  try {
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "aic.tsomnath@gmail.com",
          pass: "50mn47h@1398",
        },
      });
      const token = user.token; // change this id for security purpose
      // const token = jwt.sign({ user: user }, SECRET_KEY);
      // console.log(token);
      const url = `http://localhost:3000/resetPassword/${token}`;
      const mailOptions = {
        from: '"Sell-Your-Car" <aic.tsomnath@gmail.com>',
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Password</h1>
                <p>Click on the link to reset your password</p>
                <a href=${url}>Reset Password</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json("email sent");
    } else {
      res.json("email not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

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
    console.log(" user is ", user);
    if (user) {
      const userId = user._id;
      console.log(userId);
      // const hashedPassword = await bcrypt.hash(newPassword, 10);
      // console.log(hashedPassword);
      await User.findByIdAndUpdate(userId, { password: newPassword });
      const updatedUser = {
        _id: user._id,
        fullname: user.fullname,
        district: user.district,
        state: user.state,
        mobilenumber: user.mobilenumber,
        email: user.email,
        username: user.username,
        password: newPassword,
      };
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
};

export const membershipInfo = async (req, res) => {
  const token = req.body.token;
  // const decoded = jwt.verify(token, SECRET_KEY);
  // console.log(decoded)
  try {
    const user = await User.findOne({ token: token });
    // console.log("user is ", user);
    if (user) {
      res.json(user);
    } else {
      res.json("token not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//test it later
export const updateMembership = async (req, res) => {
  console.log("updateMembership controller entered");
  const token = req.body.headers;
  try {
    const user = await User.findOne({ token: token });
    // console.log("user is ", user);
    if (user) {
      // await User.findOneAndUpdate({ user ,  {membership: true} });
      // const currentDate = new Date();
      // console.log("current date",currentDate)
      // const currentDate2 = currentDate + (365 * 24 * 60 * 60);
      // console.log("current date 2 ", currentDate2)
      // const newExpiryDate = new Date(currentDate2);
      // console.log("expiry ",newExpiryDate)
      // const a = currentDate.setFullYear(currentDate.getFullYear() + 1);

      var currentDate = new Date();
      console.log("currentDate", currentDate);
      // console.log(exp.setFullYear(exp.getFullYear() + 1))
      var exp2 = currentDate.setFullYear(currentDate.getFullYear() + 1);
      var newExpiryDate = new Date(exp2);
      console.log("new expiry date", newExpiryDate);

      await User.findOneAndUpdate(
        { token: token },
        { membership: true, membershipexpiry: newExpiryDate }
      );

      res.json("membership updated");
    } else {
      res.json("token not found");
    }
  } catch (error) {
    console.log("catch block");
    res.json({ message: error.message });
  }
};

export const reportCarDetails = async (req, res) => {
  console.log("reportCarDetails controller entered");
  const info = req.body;
  console.log(info);
  const decoded = jwt.verify(info.token, SECRET_KEY);
  console.log(decoded);
  const username = decoded.user.username;
  const addreport = {};
  addreport.username = username;
  addreport.carId = info.carId;
  addreport.reportMessage = info.reportMessage;
  console.log("addreport", addreport);

  try {
    const newReport = new Report(addreport);
    await newReport.save();
    console.log("report saved");
    res.json("car reported");
  } catch (error) {
    res.json({ message: error.message });
  }
};

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
        res.json({ token: user.token });
      } else {
        res.json({ message: "password not match" });
      }
    } else {
      res.json({ message: "user not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  console.log("getAllUsers controller entered");
  try {
    const users = await User.find();
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllCars = async (req, res) => {
  console.log("getAllCars controller entered");
  try {
    const cars = await CarDetail.find();
    // console.log(users);
    res.json(cars);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllReports = async (req, res) => {
  console.log("getAllReports controller entered");
  try {
    const reports = await Report.find();
    // console.log(users);
    res.json(reports);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  console.log("delete user controller enterd");

  const id = req.params.id;
  console.log(id);
  try {
    await Report.deleteOne({ _id: id });
    res.json("report deleted successfully");
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteCarFromReport = async (req, res) => {
  console.log("deleteCarFromReport controller entered");
  const reportid = req.params.id;
  console.log(reportid);

  try {
    const report = await Report.findOne({ _id: reportid });
    console.log("report", report);
    const user = await User.findOne({ carId: report.carId });
    console.log("user", user);
    //delete car details from users cardetails array
    if (
      await User.findByIdAndUpdate(user._id, { $pull: { carId: report.carId } })
    ) {
      console.log("update done");
    }
    await carDetail.findByIdAndDelete(report.carId);
    await Report.deleteMany({ reportid });
    res.json("deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const getAllPayments = async (req, res) => {
  console.log("getAllPayment controller entered");
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.json({ message: error.message });
  }
}

export const getAdminDetails = async (req, res) => {
  console.log("getAdminDetails controller entered");
  const token = req.headers.token;
  // console.log(token);
  try {
    const user = await Admin.findOne({ token: token });
    // console.log("user is ", user);
    if (user) {
      res.json(user);
    } else {
      res.json("token not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateAdminDetails = async (req, res) => {
  console.log("updateAdminDetails controller entered");
  const info = req.body;
  console.log(info);
  const id = info._id;
  try {
    // console.log("info",info)
    const user = await Admin.findByIdAndUpdate(id, info);
    res.json("updated");
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const forgotAdminPassword = async (req, res) => {
  console.log("forgotAdminPassword controller entered");
  const email = req.body.email;
  // console.log(req.body);
  // console.log(email);
  try {
    const user = await Admin.findOne({ email: email });
    // console.log(user);
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "aic.tsomnath@gmail.com",
          pass: "50mn47h@1398",
        },
      });
      const token = user.token; // change this id for security purpose
      // const token = jwt.sign({ user: user }, SECRET_KEY);
      // console.log(token);
      const url = `http://localhost:3000/resetAdminPassword/${token}`;
      const mailOptions = {
        from: '"Sell-Your-Car" <aic.tsomnath@gmail.com>',
        to: email,
        subject: "Reset Admin Password",
        html: `<h1>Reset Password</h1>
                <p>Click on the link to reset your password</p>
                <a href=${url}>Reset Password</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json("email sent");
    } else {
      res.json("email not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const resetAdminPassword = async (req, res) => {
  console.log("resetPassword controller entered");
  const info = req.body;
  console.log(info);
  const newPassword = info.password;
  const token = info.token;
  console.log(newPassword);
  // console.log(token);
  try {
    const user = await Admin.findOne({ token: token });
    // console.log(" user is ", user);
    if (user) {
      const userId = user._id;
      // console.log(userId);
      // const hashedPassword = await bcrypt.hash(newPassword, 10);
      // console.log(hashedPassword);
      await Admin.findByIdAndUpdate(userId, { password: newPassword });
      const updatedUser = {
        _id: user._id,
        mobilenumber: user.mobilenumber,
        email: user.email,
        username: user.username,
        password: newPassword,
      };
      // console.log(updatedUser);
      const updatedToken = jwt.sign({ user: updatedUser }, SECRET_KEY);
      // console.log(updatedToken);
      await Admin.findByIdAndUpdate(userId, { token: updatedToken });
      res.json("password updated");
    } else {
      res.json("token not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};


//razorpay payment controller
export const razorpay = async (req, res) => {
  try {
    const razorPayInstance = new Razorpay({
      key_id: "rzp_test_ZlmqeEsQ5H3qpM",
      key_secret: "59KFcWeJMs49SNGl8JvV7q5c",
    });
    const responce = await razorPayInstance.orders.create({
      amount: "100",
      currency: "INR",
      receipt: uuidv4(),
      payment_capture: 1,
    });
    console.log(responce);
    res.json({responce});
  } catch (error) {
    res.json({ message: error.message });
  }
};

//add payment details to database 
export const addPaymentDetail = async(req, res) => {
const paymentDetail = req.body;
console.log("paymentDetail", paymentDetail);
const newPayment = new Payment(paymentDetail);
  try {
    await newPayment.save();
    res.json("payment added");
  } catch (error) {
    res.json({ message: error.message });
  }
}

//paytm payment controller(not used)
export const payment = async (req, res) => {
  console.log("payment controller entered");
  /* import checksum generation utility */
  //   var PaytmChecksum = require("./PaytmChecksum");

  var paytmParams = {};
  const token = req.body.headers;
  const user = await User.findOne({ token: token });
  const email = user.email;
  const amount = "499";

  /* initialize an array */
  //MID is paytm merchant id
  paytmParams["MID"] = "TsWIdE43944553934118";
  //   paytmParams["ORDERID"] = "YOUR_ORDER_ID_HERE";
  paytmParams["ORDERID"] = uuidv4();
  console.log({ paytmParams });

  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    paytmParams,
    "SZjAZbRUziOVYAvn" //merchant key
  );
  paytmChecksum
    .then(function (checksum) {
      //   console.log("generateSignature Returns: " + checksum);
      let newPaytmParams = {
        ...paytmParams,
        CHECKSUMHASH: checksum,
      };
      res.json(newPaytmParams);
    })
    .catch(function (error) {
      console.log(error);
    });
};



export const fetchOlxData = async (req, res) => {
  console.log("fetchOlxData controller entered");
  const url = req.body.headers;
  console.log("url", url);
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  })
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 0 });
  
  await page.click('[class="_89yzn"]')
  // await page.waitFor(2000);
  //wait until the page is loaded
  await page.waitForSelector('[class="_3qDp0"]', { waitUntil: 'load', timeout: 0 });
  const price = await page.evaluate(() => {
    const elements = document.getElementsByClassName('_3qDp0');
    return Array.from(elements).map(element => element.innerText); 
  })
  console.log(price); 

  const odometer = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('._3Q0_l div'))
        return tds.map(td => td.textContent)
  })
  console.log("odometer", odometer);

  let olxresponce = {
    fuelType: price[0],
    odoMeter: price[1],
    transmissionType: price[2],
  }
  res.json(olxresponce);
} catch (error) {
  res.json({ message: error.message });
}
}



export const fetchCarwaleData = async (req, res) => {
  console.log("fetchCarwaleData controller entered");
  const url = req.body.headers;
  console.log("url", url);
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  })
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 0 });
  // await page.waitForSelector('[class="o-eqqVmt o-eemiLE o-cYdrZi"]', { waitUntil: 'load', timeout: 0 });

  const price = await page.evaluate(() => {
    const elements = document.getElementsByClassName('o-Hyyko o-bPYcRG o-eqqVmt');
    return Array.from(elements).map(element => element.innerText); 
  })
  // console.log("price", price);
  const finalPrice = price[0].replace( /^\D+/g, '');
  // console.log("finalPrice", finalPrice);



  const details = await page.evaluate(() => {
    const elements = document.getElementsByClassName('o-eqqVmt o-eemiLE o-cYdrZi');
    return Array.from(elements).map(element => element.innerText); 
  })
  // console.log(details);
  let tempacceleration= details[5];
  // let tempengine = details[1]
  // console.log("tempengine", tempengine)


  let carwaleresponce = {
    fuelType: details[0],
    engine: details[1],
    acceleration: tempacceleration[0],
    price: finalPrice,
  }
  console.log("carwaleresponce", carwaleresponce);
res.json(carwaleresponce);


} catch (error) {
  res.json({ message: error.message });
}
}



export const test = async(req, res) =>{
 
}













//search functionality == done
//add comparison of car price
// add payment gateway

//add alerts
//change navbar
//change expand button effect on car details page, accordion error - fixed
//addcar payload too large error-> solved/ check again
//update token in localstorage after update and sign in again

//admin panel, set default dashboard
