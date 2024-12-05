import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1); // Detener el servidor si no se conecta
  }
};

export default connectDB;
