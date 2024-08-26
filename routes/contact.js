import dotenv from 'dotenv';
import express from 'express';
import { contactus } from './sendmail.js';
import Ratings from '../model/Ratings.js';
import fetchuser from '../middleware/fetchuser.js';

dotenv.config();

const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

router.post('/mailus', async (req, res) => {
    let success = false;

    try {
        contactus(req, res);
    }
    catch (err) {
        res.status(500).send({ success, message: "Internal server error occured." });
    }

});

router.post('/rateus', fetchuser, async (req, res) => {
    let success = false;
    try {
        await Ratings.create({
            userId: req.user.id,
            name: req.body.name,
            feedback: req.body.feedback,
            rate: req.body.rate
        });

        return res.status(200).json({success: true, message: "Thanks for your feedback!"})
    }
    catch (err) {
        res.status(500).send({ success, message: err.message });
    }

});

router.get('/getrate', async (req, res) => {
    let success = false;
    try {
        const ratings = await Ratings.find();

        return res.status(200).json({success: true, ratings: ratings })
    }
    catch (err) {
        res.status(500).send({ success, message: "Internal server error occured." });
    }

});

export default router;