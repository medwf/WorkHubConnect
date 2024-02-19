
import mongoose from "mongoose";

export async function connect() {
    try {
        console.log(`Connecting to MongoDB at ${process.env.MONGO_URI}`);
        await mongoose.connect("mongodb://localhost:27017/mydata");
        const connection = mongoose.connection;
        console.log("now");
        
        connection.on('connected',() => {
            console.log('MongoDB connected');
        });

        connection.on('error',(err) => {
            console.log('MongoDb connection error, please mure sure MongoDB is Running');
            console.log('MongoDB error',err);
            process.exit();
        });
        
    } catch (error) {
        console.log("Error connecting to MongoDB!");
        console.error(error);
    }
}
