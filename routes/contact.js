import dotenv from 'dotenv';
import express from 'express';
import { contactus } from './sendmail.js';

dotenv.config();

const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// Route 1 : Book the slot using : POST "/user/booking/slotbooking"
router.post('/mailus', async (req, res) => {
    let success = false;

    try {
        contactus(req, res);
    }
    catch (err) {
        res.status(500).send({ success, message: "Internal server error occured." });
    }

});

export default router;