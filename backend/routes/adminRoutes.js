const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController.");

// Rutas para manejar usuarios
router
  .route("/users") // Ruta para obtener todos los usuarios
  .get( getUsers);

router
  .route("/users/:id") // Rutas para modificar y eliminar un usuario específico
  .put( updateUser)
  .delete( deleteUser);

// Rutas para manejar productos
router
  .route("/products") // Ruta para obtener todos los productos
  .get( getProducts);

router
  .route("/products/:id") // Rutas para modificar y eliminar un producto específico
  .put( updateProduct)
  .delete( deleteProduct);

module.exports = router;
