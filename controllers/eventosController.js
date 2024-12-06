import Evento from "../models/evento.js";
import jwt from 'jsonwebtoken';

export const loginUsuario = async (req, res) => {
  const { username, password } = req.body;

  // Validación de credenciales
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un evento
export const crearEvento = async (req, res) => {
    try {
      const { nombre, fecha, ubicacion, organizador } = req.body;
  
      // Validación básica
      if (!nombre || !fecha || !ubicacion || !organizador) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
  
      const nuevoEvento = new Evento({ nombre, fecha, ubicacion, organizador });
      const eventoGuardado = await nuevoEvento.save();
  
      res.status(201).json(eventoGuardado);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el evento", error: error.message });
    }
  };

export const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(eventoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarEvento = async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
