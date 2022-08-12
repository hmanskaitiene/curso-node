import dotenv from 'dotenv';
dotenv.config();
import { mongoose } from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN)
        console.log('MongoDB conectada')
    } catch (err) {
        console.log(err)
    }
}

export default connectDB