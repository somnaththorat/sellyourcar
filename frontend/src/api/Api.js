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



// export const updateUser = async (user)=>{

// }



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
    // console.log("api->new pass",pass);
    // console.log("api-> token",token);
    return await axios.post(`${usersUrl}/resetpassword`, {password : pass, token : token} );
}


export const membershipInfo = async(token) => {
    return await axios.post(`${usersUrl}/membershipinfo`, {token: token});
}


