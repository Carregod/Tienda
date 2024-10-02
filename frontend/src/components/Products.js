import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Card, Button, Form, Alert } from 'react-bootstrap';


const Products = ( ) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const buyProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/buy/${id}`);
      setProducts(products.map(product => 
        product._id === id ? { ...product, isAvailable: false } : product
      ));
    } catch (error) {
      console.error('Error al comprar el producto:', error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      setDeletedProduct(response.data);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Oculta la alerta después de 3 segundos
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
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
      {showAlert && deletedProduct && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {`El producto "${deletedProduct.name}" ha sido eliminado.`}
        </Alert>
      )}

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
                <Card.Text><strong>Estado: {product.isAvailable ? 'Disponible' : 'No Disponible'}</strong></Card.Text>
                {product.isAvailable && (<Button variant="primary" onClick={() => buyProduct(product._id)}>Comprar</Button>)}
                {/* <Button variant="danger" onClick={() => deleteProduct(product._id)}>Eliminar</Button> */}
                </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
