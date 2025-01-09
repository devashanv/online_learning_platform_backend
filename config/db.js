import mongoose from "mongoose";

//db connection
const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.OLPDB_URI)
        console.log("DB successfully connected");
    }
    catch(err){
        console.log(`DB connection error: ${err}`);
    }
}

export default dbConnect;