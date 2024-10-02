const Product = require('../models/Product');

// Añadir un nuevo producto
const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description, isAvailable: true, image: req.body.image || '' });
    await newProduct.save();
    res.status(201).json({ message: 'Producto añadido exitosamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el producto', error });
  }
};

// Función para obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Obtén todos los productos de la base de datos
    res.json(products); // Envía los productos como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

const buyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.isAvailable = false; 
    await product.save();
    
    res.json({ message: 'Producto comprado exitosamente', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al comprar el producto', error });
  }
};

module.exports = { addProduct, getProducts, buyProduct };





