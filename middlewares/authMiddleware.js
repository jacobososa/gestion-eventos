import jwt from 'jsonwebtoken';

const autenticarUsuario = (req, res, next) => {
  // Verificar si el token está presente en los encabezados de la solicitud
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no hay token' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Guardar los datos del usuario en el objeto req
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({ message: 'Token no válido' });
  }
};

export default autenticarUsuario;
