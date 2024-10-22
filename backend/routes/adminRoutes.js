const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  getProducts,
  updateProduct,
  deleteProduct,
  disableProduct,
  activateProduct,
  getProductsBySales,
  getProductsByPrice,
  getProductsByQuantity,
  getProductAvailabilityStats,
  getRevenueStats,
  getInventoryValue,
} = require("../controllers/adminController.");

// Rutas para manejar usuarios
router
  .route("/users") // Ruta para obtener todos los usuarios
  .get(getUsers);

router
  .route("/users/:id") // Rutas para modificar y eliminar un usuario específico
  .put(updateUser)
  .delete(deleteUser);

// Rutas para manejar productos
router
  .route("/products") // Ruta para obtener todos los productos
  .get(getProducts);

router
  .route("/products/:id") // Rutas para modificar y eliminar un producto específico
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/disable/:id").put(disableProduct);

router.route("/activate/:id").put(activateProduct);

// Ruta para obtener productos vendidos de mayor a menor
router.get("/products-by-sales", getProductsBySales);

// Ruta para obtener productos por precio de mayor a menor
router.get("/products-by-price", getProductsByPrice);

// Ruta para obtener productos por cantidad en inventario de mayor a menor
router.get("/products-by-quantity", getProductsByQuantity);

// Ruta para obtener estadísticas de disponibilidad de productos
router.get("/product-availability", getProductAvailabilityStats);

// Ruta para obtener ingresos totales y mensuales
router.get("/revenue-stats", getRevenueStats);

// Ruta para obtener el valor total del inventario
router.get("/inventory-value", getInventoryValue);

module.exports = router;
