import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Card, Button, Form } from 'react-bootstrap';
import './Products.css'; 


const Products = ( ) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false); // Estado para controlar la visibilidad
  const cartRef = useRef(null); // Referencia para el contenedor del carrito

  // const [deletedProduct, setDeletedProduct] = useState(null);
  // const [showAlert, setShowAlert] = useState(false);
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Añadir producto al carrito con cantidad seleccionada
  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si el producto no está, agrégalo con la cantidad seleccionada
      setCart([...cart, { ...product, quantity }]);
    }
  };

    // Eliminar producto del carrito
    const removeFromCart = (id) => {
      setCart(cart.filter((product) => product._id !== id));
    };
    const handlePurchase = async () => {
      if (cart.length === 0) {
        alert('El carrito está vacío. No se puede realizar la compra.');
        return;
      }
    
      try {
        // Realizamos la solicitud al backend para procesar la compra
        const response = await axios.post('http://localhost:5000/api/products/purchase', { cartItems: cart });
    
        if (response.status === 200) {
          alert(response.data.message); // Mensaje del servidor
    
          // Actualizamos la cantidad de productos en el frontend
          const updatedProducts = products.map((product) => {
            const cartItem = cart.find((item) => item._id === product._id);
            if (cartItem) {
              return { ...product, quantity: product.quantity - cartItem.quantity };
            }
            return product;
          });
    
          // Actualizamos el estado de los productos y vaciamos el carrito
          setProducts(updatedProducts);
          setCart([]); // Vacía el carrito después de la compra
          alert('Compra realizada con éxito');
        } else {
          // Si la respuesta no es 200, mostramos un mensaje de error
          alert('Error en la compra. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        // Manejo de errores
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
  
  const toggleCart = () => {
    setCartVisible(prevState => !prevState); // Alternar visibilidad del carrito
  };

  // Maneja clics fuera del carrito
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisible(false); // Oculta el carrito si se hace clic fuera de él
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

      {/* Alerta de producto eliminado */}
      {/* {showAlert && deletedProduct && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {`El producto "${deletedProduct.name}" ha sido eliminado.`}
        </Alert>
      )} */}

      {/* Tarjetas de productos */}
      <div className="row">
        {filteredProducts.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Precio: ${product.price}</strong></Card.Text>
                <Card.Text><strong>Cantidad: ${product.quantity}</strong></Card.Text>
                <Card.Text><strong>Estado: {product.isAvailable ? 'Disponible' : 'No Disponible'}</strong></Card.Text>
                {product.isAvailable && (
                  <>
                    <Form.Control
                      type="number"
                      min="1"
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
                {/* {product.isAvailable && (<Button variant="primary" onClick={() => buyProduct(product._id)}>Comprar</Button>)} */}
                {/* <Button variant="danger" onClick={() => deleteProduct(product._id)}>Eliminar</Button> */}
                </Card.Body>
            </Card>
          </div>
        ))}
      </div>
       {/* Ícono de carrito flotante */}
       <div className="cart-icon"  onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cart.length}</span>
      </div>

      {/* Detalles del carrito al hacer clic en el ícono */}
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
