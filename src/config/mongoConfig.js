import mongoose from "mongoose";
import cluster from "cluster";
export default async function connectMongo(MONGO_URI) {
    try {
        await mongoose.connect(MONGO_URI);
        if (cluster.isPrimary) {
            console.log("✅ Database connected!");
        }
        
    } catch (error) {
        console.error("❌ Error connecting DB:", error);
    }
}