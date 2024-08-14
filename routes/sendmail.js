import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import OTPVerification from '../model/OTP.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amanvermalmv211@gmail.com',
        pass: process.env.MAIL_PASS
    }
})

async function sendOTP(req, res) {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const optGeneration = {
        from: 'amanvermalmv211@gmail.com',
        to: req.body.email,
        subject: 'ShutterPics : Verify your account!',
        html: `<p>OTP for verification at shutterpics.in is : <b>${otp}</b>.<br>This code is expires within 2 minutes.</p>`
    }

    try {
        // Securing OTP
        const salt = await bcrypt.genSalt(10);
        const secOTP = await bcrypt.hash(otp, salt);

        let user = await OTPVerification.findOne({ email: req.body.email });
        if (user) {
            const currDate = new Date();

            const newOTP = {
                email: req.body.email,
                otp: secOTP,
                timestamp: new Date(currDate.getTime())
            }

            await OTPVerification.findOneAndUpdate({ email: req.body.email }, { $set: newOTP }, { new: true });
            await transporter.sendMail(optGeneration);

            return res.status(201).json({
                success: true,
                message: "OTP has been send successfully"
            });
        }

        await OTPVerification.create({
            email: req.body.email,
            otp: secOTP,
        });

        await transporter.sendMail(optGeneration);

        return res.status(201).json({
            success: true,
            message: "OTP has been send successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error occured, Please try again!"
        });
    }

}

export async function contactus(req, res) {
    const message = `<p>Someone wanna contact you<br>Following are the details for that person.<br><br>
    <b>Name : </b>${req.body.name} <br>
    <b>Contact No : </b>${req.body.contactnum} <br>
    <b>E-mail address : </b>${req.body.email} <br>
    <b>Address : </b>${req.body.address} <br>
    <b>Message : </b>${req.body.message} <br>
    </p>
    `;

    const contactDetails = {
        from: 'amanvermalmv211.com',
        to: 'shutterpicsstudio@gmail.com',
        subject: 'ShutterPics : Someone wanna contact you!',
        html: message
    }

    try {
        await transporter.sendMail(contactDetails);

        return res.status(201).json({
            success: true,
            message: "Thank you! We will contact you soon"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error, Unable to send message"
        });
    }

}

export async function bookingmail(req, res) {

    const date = new Date(req.body.bookingdate);

    let message = `<p>Someone wanna book the date.<br>Following are the details for that person.<br><br>
    <b>Name : </b>${req.body.name} <br>
    <b>Contact No : </b>${req.body.contactnum} <br>
    <b>Address : </b>${req.body.address} <br><br>
    <b>Booking Date : </b>${date.getDate()}/${date.getMonth()}/${date.getFullYear()} <br>
    <b>Event : </b>${req.body.eventname} <br>
    <b>Time Slot : </b>${req.body.timeslot} <br>
    </p>
    `;

    const contactDetails = {
        from: 'amanvermalmv211.com',
        to: 'shutterpicsstudio@gmail.com',
        subject: 'ShutterPics : Someone wanna book the date!',
        html: message
    }

    try {
        await transporter.sendMail(contactDetails);

        return res.status(201).json({
            success: true,
            message: "Thank you! We will contact you soon"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error, Unable to send message"
        });
    }

}

export default sendOTP;