import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    registrationYear: Number,
    fuelType: String,
    transmissionType: String,
    registrationState: String,
    price: Number,
    engine: Number,
    milage: Number,
    color: String,
    doors: Number,
    seats: Number,
    airbags: Number,
    airconditioning: Boolean,
    acceleration: Number,
    drivingrange: Number,
    odometer: Number,
    description: String,
    carImages: String,
    ownerDetails: {
        type: Object,
    }


    // carImages: [Object],
});

const CarDetail = mongoose.model('cardetail', carSchema);

export default CarDetail;   