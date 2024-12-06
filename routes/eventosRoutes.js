import express from "express";
import { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento, obtenerEventoPorId } from "../controllers/eventosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();



// Rutas públicas (sin autenticación)
router.get("/eventos", obtenerEventos);
router.get("/eventos/:id", obtenerEventoPorId);

// Rutas privadas (requieren autenticación)
router.post("/eventos", authMiddleware, crearEvento);
router.put("/eventos/:id", authMiddleware, actualizarEvento);
router.delete("/eventos/:id", authMiddleware, eliminarEvento);

export default router;
