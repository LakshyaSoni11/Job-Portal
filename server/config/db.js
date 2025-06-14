import mongoose from "mongoose";
//function to connect to the database
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("DB connected"));
    mongoose.connection.on('error', (err) => console.error("MongoDB Error:", err));
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
};


export default connectDB;