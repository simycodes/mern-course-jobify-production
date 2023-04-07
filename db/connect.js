import mongoose from 'mongoose';

// MONGOOSE connect() FUNCTION RETURNS A PROMISE HENCE NEED TO SET UP 
// ASYNC-WAIT FUNCTIONALITY IN THE server.js - IN ORDER TO AWAIT ON THE PROMISE HAVING DATA

// url STRING IS THE CONNECTION STRING TO THE DB
const connectDB = (url) => {
    return mongoose.connect(url);
}

export default connectDB;
