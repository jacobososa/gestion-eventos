import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js'; // Importamos las funciones del controlador
const router = express.Router();

console.log('Registrando rutas de autenticación');

// Ruta para registrar un usuario
router.post('/register', registrarUsuario);

// Ruta para iniciar sesión (login)
router.post('/login', loginUsuario);

export default router;
