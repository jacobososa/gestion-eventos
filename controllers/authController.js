import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'; // Asumiendo que tienes un modelo Usuario


// Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el username ya existe
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El username ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      username,
      password: passwordEncriptada,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Iniciar sesión de un usuario (login)
export const loginUsuario = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el username existe
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(400).json({ message: 'username o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ message: 'username o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, username: usuario.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};
