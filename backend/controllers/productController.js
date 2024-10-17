const Product = require('../models/Product');
const PurchasedProduct = require('../models/PurchasedProduct');

// Añadir un nuevo producto
const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    const newProduct = new Product({ name, price, quantity , description, isAvailable: true, image: req.body.image || '' });
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

// Actualizar producto y su cantidad
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl, quantity }, // Actualizar también la cantidad
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Función para obtener todos los productos
const buyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Cantidad que se quiere comprar

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si hay stock suficiente
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Stock insuficiente para el producto' });
    }

    // Descontar la cantidad comprada del producto
    product.quantity -= quantity;
    await product.save();

    // Registrar el producto comprado en la colección PurchasedProduct
    const purchasedProduct = new PurchasedProduct({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity
    });
    await purchasedProduct.save();

    res.json({ message: 'Producto comprado exitosamente', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al comprar el producto', error });
  }
};
const purchaseProducts = async (req, res) => {
  const { cartItems } = req.body; // Productos en el carrito

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío' });
  }

  try {
    // Iterar sobre cada producto en el carrito
    for (const item of cartItems) {
      // Verificar si el item tiene la estructura adecuada
      if (!item._id || !item.quantity) {
        return res.status(400).json({ message: 'El formato de los datos del carrito es incorrecto' });
      }

      // Buscar el producto en la base de datos
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: `Producto con ID ${item._id} no encontrado` });
      }

      // Verificar si hay suficiente stock
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para el producto: ${product.name}` });
      }

      // Actualizar el stock del producto
      product.quantity -= item.quantity;
      await product.save();

      // Registrar el producto comprado en la colección PurchasedProduct
      const purchasedProduct = new PurchasedProduct({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });

      await purchasedProduct.save();
    }

    // Si todo sale bien, se confirma la compra
    res.status(200).json({ message: 'Compra realizada con éxito' });
  } catch (error) {
    console.error('Error durante la compra:', error);
    res.status(500).json({ message: 'Error en la compra', error });
  }
};


module.exports = { addProduct, getProducts, buyProduct, updateProduct, purchaseProducts};










