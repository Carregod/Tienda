const Product = require("../models/Product");
const User = require("../models/User");
const PurchasedProduct = require("../models/PurchasedProduct");

// Obtener todos los productos
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Modificar producto

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, quantity } = req.body;

  try {
    // Verificar si la cantidad es mayor que 0 para actualizar isAvailable
    const isAvailable = quantity > 0;

    // Actualizar el producto en la base de datos
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl, quantity, isAvailable }, // Se actualizan los campos incluyendo isAvailable
      { new: true } // Devuelve el producto actualizado
    );

    // Enviar el producto actualizado como respuesta
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Manejar errores en la actualización
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("ID recibido:", id); // Verifica si llega el ID
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando el producto", error });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// inabilitar
const disableProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // En lugar de eliminar el producto, lo marcamos como inactivo
    const product = await Product.findByIdAndUpdate(
      id,
      { isInactive: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Producto inhabilitado con éxito", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al inhabilitar el producto", error });
  }
};

// Hailitar
const activateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // En lugar de eliminar el producto, lo marcamos como activo
    const product = await Product.findByIdAndUpdate(
      id,
      { isInactive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto activado con éxito", product });
  } catch (error) {
    res.status(500).json({ message: "Error al activar el producto", error });
  }
};

// Modificar usuario
const updateUser = async (req, res) => {
  const { id } = req.params; // Tomamos el ID desde los parámetros de la ruta
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      const updatedUser = await user.save();
      res.json(updatedUser); // Devolvemos el usuario actualizado
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params; // Tomamos el ID desde los parámetros de la ruta

  try {
    const user = await User.findById(id);

    if (user) {
      await user.remove();
      res.json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};

// Obtener productos vendidos de mayor a menor
const getProductsBySales = async (req, res) => {
  try {
    const products = await PurchasedProduct.aggregate([
      {
        $group: {
          _id: "$productId",
          totalQuantitySold: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "products", // Nombre de la colección "Product"
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $sort: { totalQuantitySold: -1 },
      },
      // Proyección para incluir solo los campos que necesitas
      {
        $project: {
          _id: 0, // Si no quieres incluir el _id
          productId: "$_id",
          totalQuantitySold: 1,
          name: "$productDetails.name", // Nombre del producto
          price: "$productDetails.price", // Precio del producto (opcional)
          // Puedes incluir otros campos que desees de productDetails
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos por ventas:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los productos por ventas." });
  }
};

// Obtener productos ordenados por precio de mayor a menor
const getProductsByPrice = async (req, res) => {
  try {
    const products = await Product.find().sort({ price: -1 }); // Ordenar por precio de mayor a menor
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos por precio", error });
  }
};

// Obtener productos ordenados por cantidad en inventario de mayor a menor
const getProductsByQuantity = async (req, res) => {
  try {
    const products = await Product.find().sort({ quantity: -1 }); // Ordenar por cantidad en inventario
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos por cantidad", error });
  }
};

// Obtener estadísticas de disponibilidad de productos
const getProductAvailabilityStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments(); // Total de productos
    const availableProducts = await Product.find(
      { quantity: { $gt: 0 }, isAvailable: true },
      "name"
    ); // Productos disponibles
    const unavailableProducts = await Product.find(
      { quantity: 0, isAvailable: false },
      "name"
    ); // Productos no disponibles
    const enabledProducts = await Product.find({ isAvailable: true }, "name"); // Productos habilitados
    const disabledProducts = await Product.find({ isAvailable: false }, "name"); // Productos deshabilitados

    res.status(200).json({
      totalProducts,
      availableProducts,
      unavailableProducts,
      enabledProducts,
      disabledProducts,
    });
  } catch (error) {
    console.error(
      "Error al obtener las estadísticas de disponibilidad de productos:",
      error
    );
    res
      .status(500)
      .json({
        message:
          "Error al obtener las estadísticas de disponibilidad de productos.",
      });
  }
};

// Obtener ingresos totales y mensuales
const getRevenueStats = async (req, res) => {
  try {
    const totalRevenue = await PurchasedProduct.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);

    const monthlyRevenue = await PurchasedProduct.aggregate([
      {
        $group: {
          _id: { $month: "$purchasedAt" },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);

    res.status(200).json({
      totalRevenue: totalRevenue[0] ? totalRevenue[0].totalRevenue : 0,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las estadísticas de ingresos",
      error,
    });
  }
};

// Obtener el valor total del inventario
const getInventoryValue = async (req, res) => {
  try {
    const inventoryValue = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);

    res.status(200).json({
      totalValue: inventoryValue[0] ? inventoryValue[0].totalValue : 0,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el valor del inventario", error });
  }
};

module.exports = {
  getProducts,
  updateProduct,
  deleteProduct,
  getUsers,
  updateUser,
  deleteUser,
  disableProduct,
  activateProduct,
  getProductsBySales,
  getProductsByPrice,
  getProductsByQuantity,
  getProductAvailabilityStats,
  getRevenueStats,
  getInventoryValue,
};
