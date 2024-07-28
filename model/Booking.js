import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    contactnum: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bookingdate: {
        type: Date,
        required: true
    }
});

const Booking = mongoose.model('booking', BookingSchema);
Booking.createIndexes();

export default Booking;