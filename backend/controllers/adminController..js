const Product = require('../models/Product');
const User = require('../models/User');

// Obtener todos los productos
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Modificar producto

const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para actualizar:', id); // Para verificar si el ID llega correctamente
  
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  };
  

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido:', id); // Verifica si llega el ID
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error eliminando el producto', error });
    }
  };
 
  // Obtener todos los usuarios
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
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
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    const { id } = req.params; // Tomamos el ID desde los parámetros de la ruta

    try {
        const user = await User.findById(id);

        if (user) {
            await user.remove();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};

module.exports = { getProducts, updateProduct, deleteProduct,  getUsers, updateUser, deleteUser };
