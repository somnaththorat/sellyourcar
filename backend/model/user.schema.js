import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const SECRET_KEY = "THISISMYSECRETKEYFORSELLYOURCARPROJECTFORMCALASTSEMESTER"


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
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
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    carId: [{
        type: String,
    }],
    membership: {
        type: Boolean,
        default: false
    },
    

    token:{
        type:String,
        required:true
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
});



//generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = await jwt.sign({ _id: this._id }, SECRET_KEY);
        // this.tokens = this.tokens.concat({token:token});
        // await this.save();
        return token;
    } catch (e) {
        console.log(e);
    }
}





const user = mongoose.model('alluser', userSchema);

export default user;