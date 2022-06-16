import axios from 'axios';

const usersUrl = 'http://localhost:4000/users';



export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/adduser`, user);
}

export const getUserInfo = async (token) => {
    // return await axios.get(`${usersUrl}/account`, token);
    return await axios.get(`${usersUrl}/account`, { headers: {token} });
}


//car list in account page
export const getCarInfo = async (carIds) => {
    // return await axios.get(`${usersUrl}/mycars`, carIds);
    return await axios.get(`${usersUrl}/mycars`, { headers: {carIds} });
}


export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/deleteuser/${id}`);
}


export const authUser = async (userLoginDetails) => {
    return await axios.post(`${usersUrl}/auth`, userLoginDetails);
}

export const getCars = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addCar = async (cardetail) => {
    return await axios.post(`${usersUrl}/addcar`, cardetail);
}

export const editCar = async (cardetail) => {
    return await axios.put(`${usersUrl}/editcar`, cardetail);
}

export const deleteCarFromUser = async (car) => {
    return await axios.delete(`${usersUrl}/deletecar`, { data: car });
}


export const updateUser = async (user) => {
    return await axios.put(`${usersUrl}/updateuser`, user);
}

export const forgotPassword = async (email) => {
    // console.log("api->email",email);
    return await axios.post(`${usersUrl}/forgotpassword`, {email : email} );
}

export const resetPassword = async (pass, token) => {
    return await axios.post(`${usersUrl}/resetpassword`, {password : pass, token : token} );
}


export const membershipInfo = async(token) => {
    return await axios.post(`${usersUrl}/membershipinfo`, {token: token});
}

export const updateMembership = async (token) => {
    return await axios.post(`${usersUrl}/updatemembership`, {headers: token});
}

export const reportCarDetails = async (token, carId, reportMessage) => {
    return await axios.post(`${usersUrl}/reportcardetails`, {token: token, carId: carId, reportMessage: reportMessage});
}

export const payment = async (token) => {
    return await axios.post(`${usersUrl}/payment`, {headers: token});
}

export const razorpay = async () => {
    return await axios.post(`${usersUrl}/razorpay`);
}

export const addPaymentDetail = async (paymentDetails) => {
    return await axios.post(`${usersUrl}/addpaymentdetail`, paymentDetails);
}


//admin apis
export const authAdmin = async (adminLoginDetails) => {
    return await axios.post(`${usersUrl}/authadmin`, adminLoginDetails);
}

export const fetchAllUsers = async () => {
    return await axios.get(`${usersUrl}/getusers`);
}

export const fetchAllCars = async () => {
    return await axios.get(`${usersUrl}/getcars`);
}

export const fetchAllReports = async () => {
    return await axios.get(`${usersUrl}/getreports`);
}

export const deleteReport =async (id) => {
    return await axios.delete(`${usersUrl}/deletereport/${id}`)
}

export const deleteCar =async (id) => {
    return await axios.delete(`${usersUrl}/deletecarfromreport/${id}`)
}

export const fetchAllPayment = async () => {
    return await axios.get(`${usersUrl}/getpayments`);
}

export const getAdminDetails = async (token) => {
    return await axios.get(`${usersUrl}/admininfo`, {headers: {token}} );
}

export const updateAdmin = async (user) => {
    return await axios.put(`${usersUrl}/updateadmin`, user);
}


export const forgotAdminPassword = async (email) => {
    // console.log("api->email",email);
    return await axios.post(`${usersUrl}/forgotadminpassword`, {email : email} );
}

export const resetAdminPassword = async (pass, token) => {
    return await axios.post(`${usersUrl}/resetadminpassword`, {password : pass, token : token} );
}