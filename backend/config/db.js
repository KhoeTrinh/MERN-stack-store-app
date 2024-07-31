import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected succesfully to MongoDB 👍')
    } catch (error) {
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB;