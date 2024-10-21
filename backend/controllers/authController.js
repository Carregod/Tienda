const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de usuarios
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario en la base de datos
    const user = await User.create({ name, email, password: hashedPassword });

    // Crear un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Almacenar el ID y rol en el token
      process.env.JWT_SECRET || "secretKey", // Usa una clave secreta desde el archivo .env o una clave por defecto
      { expiresIn: "1h" }
    );

    // Enviar token y datos del usuario
    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(400).json({ message: "Error al registrar usuario" });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Almacenar el ID y rol en el token
      process.env.JWT_SECRET || "secretKey", // Usa una clave secreta desde el archivo .env o una clave por defecto
      { expiresIn: "1h" }
    );

    // Enviar token y rol del usuario
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

module.exports = { registerUser, loginUser };
