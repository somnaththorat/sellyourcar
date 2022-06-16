import mongoose from "mongoose";

var currentDate = new Date();
var exp2 = currentDate.setFullYear(currentDate.getFullYear() + 1);
var newExpiryDate = new Date(exp2);

const paymentDetailSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    mobilenumber: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: newExpiryDate
    }
});



const Payment = mongoose.model('paymentdetail', paymentDetailSchema);

export default Payment; 