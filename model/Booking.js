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
    timeslot: {
        type: String,
        required: true
    },
    eventname: {
        type: String,
        required: true
    },
    bookingdate: {
        type: Date,
        required: true,
        get: (bookingdate) => bookingdate.getTime(),
        set: (bookingdate) => new Date(bookingdate)
    },
    bookingdate: {
        type: Date,
        required: true,
        get: (bookingdate) => bookingdate.getTime(),
        set: (bookingdate) => new Date(bookingdate)
    },
    currdate: {
        type: String,
        required: true
    },
    prize: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('booking', BookingSchema);
Booking.createIndexes();

export default Booking;