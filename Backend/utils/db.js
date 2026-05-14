import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (err) {
    console.log("Error connecting to mongoDB ", err.message);
    process.exit(1);
  }
};
export default connectDB;
