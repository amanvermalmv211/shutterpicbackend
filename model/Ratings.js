import mongoose from 'mongoose';
const { Schema } = mongoose;

const RatingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const Rating = mongoose.model('rating', RatingSchema);
Rating.createIndexes();

export default Rating;