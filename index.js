import dotenv from "dotenv";
import { app, server, logger } from "./src/server.js";
import cluster from 'cluster'//nuevo
import {cpus} from 'os'//nuevo
dotenv.config({ quiet: true });


if (!process.env.PORT) {
  console.error("❌ Falta PORT");
  process.exit(1);
}

const PORT = process.env.PORT;


// if (cluster.isPrimary) {
//   console.clear();
// }


if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid}`);
  console.log(`CPUs: ${cpus().length}`);

  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit' , (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} ha finalizado`);
    logger.info('Creando un nuevo trabajador...');
    cluster.fork(); //Crear un nuevo trabajador cuando uno falla
  })

} else {
  server.listen(PORT, () => {
    logger.info(`✅ Servidor corriendo en http://localhost:${PORT} process: ${process.pid}`);
  });
}





// server.listen(PORT, () => {
//   console.log(`✅ Servidor corriendo en http://localhost:${PORT} process: ${process.pid}`);
// });