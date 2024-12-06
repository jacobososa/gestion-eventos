import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;