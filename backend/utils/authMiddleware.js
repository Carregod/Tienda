// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];
  
//   if (!token) {
//     return res.status(401).json({ message: 'No autorizado' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Token inválido' });
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

// Middleware para proteger rutas
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Verificar si hay token en los headers

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' }); // Retorna error si no hay token
  }

  // Verificar token y adjuntar la información del usuario a la solicitud
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' }); // Error si el token es inválido
    }
    req.user = decoded; // Adjuntar información del usuario (incluyendo el rol)
    next(); // Continuar con la siguiente función middleware
  });
};

// Middleware para restringir acceso solo a administradores
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' }); // Retorna error si no es admin
  }
  next(); // Si es admin, continuar
};

module.exports = { authMiddleware, adminOnly };
