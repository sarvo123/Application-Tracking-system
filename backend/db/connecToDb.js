import mongoose from "mongoose";

const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully Connect to Database !");
    }catch(error){
        console.log("Error in connecting to database :", error.message)
    }
};

export default connectToDb;