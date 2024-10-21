import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Card, Button, Form, Pagination } from 'react-bootstrap';
import '../styles/Products.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 5; // Productos por página
  const cartRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product._id !== id));
  };

  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. No se puede realizar la compra.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products/purchase', { cartItems: cart });
      if (response.status === 200) {
        const updatedProducts = products.map((product) => {
          const cartItem = cart.find((item) => item._id === product._id);
          if (cartItem) {
            const newQuantity = product.quantity - cartItem.quantity;
            if (newQuantity <= 0) {
              axios.put(`http://localhost:5000/api/products/${product._id}`, { quantity: 0, isAvailable: false });
            } else {
              axios.put(`http://localhost:5000/api/products/${product._id}`, { quantity: newQuantity });
            }
            return { ...product, quantity: newQuantity };
          }
          return product;
        });
        setProducts(updatedProducts);
        setCart([]);
        alert('Compra realizada con éxito');
      } else {
        alert('Error en la compra. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('Hubo un problema al realizar la compra. Por favor, inténtalo más tarde.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const toggleCart = () => {
    setCartVisible(prevState => !prevState);
  };

  // Manejo de clics fuera del carrito
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <h2 className="my-4 custom-title">Productos Disponibles</h2>

      {/* Barra de búsqueda */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>

      {/* Tarjetas de productos */}
      <div className="row">
        {currentProducts.map(product => (
          <div className="col-md-4 mb-4" key={product._id}>
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Precio: ${product.price}</strong></Card.Text>
                <Card.Text><strong>Cantidad: {product.quantity}</strong></Card.Text>
                <Card.Text><strong>Estado: {product.quantity > 0 ? 'Disponible' : 'No Disponible'}</strong></Card.Text>
                {product.isAvailable && (
                  <>
                    <Form.Control
                      type="number"
                      min="0"
                      max={product.quantity}
                      defaultValue="1"
                      id={`quantity-${product._id}`}
                      className="mb-2"
                    />
                    <Button
                      variant="primary"
                      onClick={() =>
                        addToCart(
                          product,
                          parseInt(document.getElementById(`quantity-${product._id}`).value)
                        )
                      }
                    >
                      Añadir al carrito
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Ícono de carrito flotante */}
      <div className="cart-icon" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cart.length}</span>
      </div>

      {/* Detalles del carrito */}
      {isCartVisible && (
        <div className="cart-details" ref={cartRef}>
          <h4>Carrito de Compras</h4>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ul>
              {cart.map((product) => (
                <li key={product._id}>
                  {product.name} - Cantidad: {product.quantity} - ${product.price * product.quantity}{' '}
                  <Button variant="danger" onClick={() => removeFromCart(product._id)}>
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <Button variant="success" onClick={handlePurchase}>
              Comprar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
