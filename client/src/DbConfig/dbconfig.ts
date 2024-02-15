import mongoose from "mongoose";

export async function connect() {
    try {
        
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        
        connection.on('connected',() => {
            console.log('MongoDB connected');
        });

        connection.on('error',(err) => {
            console.log('MongoDb connection error, please mure sure MongoDB is Running');
            console.log('MongoDB error',err);
           
        });
   
    } catch (error) {
        console.log("Error connecting!");
        console.error(error);
    }
}
