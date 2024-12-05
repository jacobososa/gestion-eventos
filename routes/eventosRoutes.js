import express from "express";
import { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento, obtenerEventoPorId } from "../controllers/eventosController.js";
const router = express.Router();

router.get("/eventos", obtenerEventos);
router.get("/eventos/:id", obtenerEventoPorId);
router.post("/eventos", crearEvento);
router.put("/eventos/:id", actualizarEvento);
router.delete("/eventos/:id", eliminarEvento);

export default router;
