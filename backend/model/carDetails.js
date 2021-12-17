import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    registrationYear: Number,
    fuelType: String,
    transmissionType: String,
    registrationState: String,
    price: Number,
    carImages: String,
    ownerDetails: {
        type: Object,
    }


    // carImages: [Object],
});

const CarDetail = mongoose.model('cardetail', carSchema);

export default CarDetail;   