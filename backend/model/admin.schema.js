import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token:{
        type:String,
        required:true
    },
});



const Admin = mongoose.model('admin', adminSchema);

export default Admin;