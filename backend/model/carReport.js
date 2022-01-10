import mongoose from "mongoose";



const carReportSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    carId:{
        type:String,
        required:true
    },
    reportMessage: {
        type: String,
        required: true
    }
});







const Report = mongoose.model('carreport', carReportSchema);

export default Report;