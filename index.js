import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userauth from './routes/userauth.js';
import booking from './routes/booking.js';
import contact from './routes/contact.js';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', (req, res)=>{
    return res.status(234).send("Welcome to shutterpics.in");
});

// Available Routes
app.use('/user/userauth', userauth);
app.use('/user/booking', booking);
app.use('/contact', contact);

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("Connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`App is listenging to port: ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});