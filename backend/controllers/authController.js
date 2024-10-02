const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// //rol user
// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     const user = await User.findOne({ _id: decoded._id });

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user; // Aquí se incluye el usuario, con el campo 'role'
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Por favor, autentícate.' });
//   }
// };


// Registro de usuarios
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar usuario' });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }
  const token = jwt.sign({ userId: user._id }, 'secretKey');
  res.json({ token });
};

module.exports = { registerUser, loginUser};
