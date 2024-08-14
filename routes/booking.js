import dotenv from 'dotenv';
import express from 'express';
import Booking from '../model/Booking.js';
import fetchuser from '../middleware/fetchuser.js';
import { bookingmail } from './sendmail.js';

dotenv.config();

const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// Route 1 : Book the slot using : POST "/user/booking/slotbooking"
router.post('/slotbooking', fetchuser, async (req, res) => {
    const date = new Date();
    const currDate = date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();

    try {
        await Booking.create({
            userId: req.user.id,
            name: req.body.name,
            contactnum: req.body.contactnum,
            address: req.body.address,
            bookingdate: req.body.bookingdate,
            timeslot: req.body.timeslot,
            eventname: req.body.eventname,
            prize: req.body.prize,
            currdate: currDate
        });
        
        bookingmail(req, res);
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error occured." });
    }

});

// Route 2 : Get all the slot for admin using : POST "/user/booking/getslots"
router.get('/admin/getslots', fetchuser, async (req, res) => {
    let success = false;
    if(req.user.type !== "admin"){
        return res.status(500).json({success: false, message: "You are not an Admin!"});
    }
    try {
        const slots = await Booking.find();

        const date = new Date();

        let data = await slots.filter((data) => { return data.bookingdate > date.getTime() })

        success = true;

        return res.status(200).json({ success, data: data });
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error occured." });
    }

});

// Route 3 : Get all the slot using : POST "/user/booking/getslots"
router.get('/getslots', async (req, res) => {
    let success = false;
    try {
        const slots = await Booking.find();

        const date = new Date();

        let data = await slots.filter((data) => { return data.bookingdate > date.getTime() })
        data = data.map((data) => { return data.bookingdate })

        success = true;

        return res.status(200).json({ success, data: data });
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error occured." });
    }

});

// Route 4 : Get slot booking by the user using : POST "/user/booking/myslot"
router.get('/myslot', fetchuser, async (req, res) => {
    let success = false;
    try {
        const user = req.user;
        const slots = await Booking.find({ userId: user.id });

        if (!slots) {
            return res.status(500).json({ success });
        }

        success = true;
        return res.status(200).json({ success, data: slots });
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error occured." });
    }

});



export default router;