import axios from 'axios';

const usersUrl = 'http://localhost:4000/users';



export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/adduser`, user);
}

export const updateUser = async (user)=>{
    
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
