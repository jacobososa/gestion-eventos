import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./database/config.js";
import eventosRoutes from "./routes/eventosRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", eventosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
