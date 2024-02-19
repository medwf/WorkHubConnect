import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/mydata", { 
            retryWrites: true, 
            w: 'majority' 
        });
        console.log(`Running on ENV = ${process.env.NODE_ENV}`);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Unable to connect.');
        console.error(error);
    }
}
