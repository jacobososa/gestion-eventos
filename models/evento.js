import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  organizador: { type: String, required: true },
}, { timestamps: true });

const Evento = mongoose.model("Evento", eventoSchema);
export default Evento;
