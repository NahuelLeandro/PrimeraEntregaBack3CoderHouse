import dotenv from "dotenv";
import { app, server } from "./src/server.js";
import cluster from 'cluster'//nuevo
import {cpus} from 'os'//nuevo
dotenv.config({ quiet: true });


if (!process.env.PORT) {
  console.error("❌ Falta PORT");
  process.exit(1);
}

const PORT = process.env.PORT;


if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid}`);
  console.log(`CPUs: ${cpus().length}`);

  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

} else {
  server.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} process: ${process.pid}`);
  });
}





// server.listen(PORT, () => {
//   console.log(`✅ Servidor corriendo en http://localhost:${PORT} process: ${process.pid}`);
// });