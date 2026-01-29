import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectMongo from "./config/mongoConfig.js";
import indexRoutes from "./routes/indexRoutes.js";

dotenv.config();

// Inicialización
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB

if (!process.env.MONGO_URI) {
    console.error("❌ Falta MONGO_URI");
    process.exit(1);
}
connectMongo(process.env.MONGO_URI);



// Rutas principales
app.use("/", indexRoutes);



/*
// 404 Handler
app.use((req, res) => {
    console.log("❌ Ruta no encontrada:", req.method, req.url);
    res.status(404).send("Ruta no encontrada");
});
*/




export { app, server };