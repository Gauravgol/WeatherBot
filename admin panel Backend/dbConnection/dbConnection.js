require('dotenv').config
const mongoose=require('mongoose')



exports.ConnectDB=async()=>{
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');    } catch (error) {
        console.log("🚀 ~ exports.ConnectDB=async ~ error:", error)
        
    }
}
