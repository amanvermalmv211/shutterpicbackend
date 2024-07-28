import mongoose from 'mongoose';
const { Schema } = mongoose;

const CustomerSchema = new Schema({
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
    }
});

const Customer = mongoose.model('customer', CustomerSchema);
Customer.createIndexes();

export default Customer;