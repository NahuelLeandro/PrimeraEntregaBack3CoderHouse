import dotenv from "dotenv";
import { app, server } from "./src/server.js";

dotenv.config();


if (!process.env.PORT) {
  console.error("❌ Falta PORT");
  process.exit(1);
}

const PORT = process.env.PORT;



server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});