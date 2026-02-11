import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectMongo from "./config/mongoConfig.js";
import indexRoutes from "./routes/indexRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import compression from "express-compression";
import winston from "winston";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


//compression
app.use(compression({
    threshold:'10kb',
    filter: (req,res) => {
        if (req.headers['x-no-compression']){
            return false;
        }
        return compression.filter(req,res);
    },
}));

//winston
/*
Niveles:
error: 0
warn: 1
info: 2
http:3
verbose:4
debug:5
*/
const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"http"}),
        new winston.transports.File({filename:'./src/utils/warns.log', level:"warn"})
    ]
})



//swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación API Adopciones",
            version: "1.0.0",
            description: "API de usuarios y mascotas"
        }
    },
    apis: [path.join(__dirname, "utils/docs/**/*.yaml")]
};

const specs = swaggerJsdoc(swaggerOptions);

if(!specs.paths){
    logger.warn("No se esta conectando Swagger");
}

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));



// Rutas principales
app.use("/", indexRoutes);








app.use(errorHandler);
export { app, server , logger };