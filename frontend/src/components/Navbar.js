import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux'; 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaUser } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthContext } from './AuthContext'; // Importamos el contexto

function TextLinkExample() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Usamos el contexto
  const navigate = useNavigate();
  

  const userRedux = useSelector((state) => state.users.user);

  // Obtener el rol del usuario desde localStorage
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
           
          <Nav className="mr-auto">
            {/* Mostrar "Acceder" y "Registrar" solo si no está autenticado */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">Acceder</Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">Registrar</Nav.Link>
              </>
            )}

            {/* Mostrar "Productos" y "Añadir Productos" solo si está autenticado */}
            {isAuthenticated && (

                <Nav.Link as={Link} to="/products" className="text-white">Productos</Nav.Link>

            )}

            {/* Mostrar la ruta "/admin" solo si el rol es 'admin' */}
            {isAuthenticated && role === 'admin' && (
              <>
              <Nav.Link as={Link} to="/admin" className="text-white">Admin</Nav.Link>
              <Nav.Link as={Link} to="/add-product" className="text-white">Añadir Productos</Nav.Link>
              <Nav.Link as={Link} to="/estadisticas" className="text-white">Estadisticas</Nav.Link>
              </>
            )}

            {/* Mostrar "Cerrar Sesión" solo si está autenticado */}
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout} className="text-white">Cerrar Sesión</Nav.Link>
            )}
          </Nav>
          </Navbar.Collapse>
          {/* Muestra el nombre del usuario autenticado */}
          {isAuthenticated && (
            <Nav className="ml-auto d-flex align-items-center">
              <FaUser className="text-white" style={{ marginRight: '8px' }} />
              <Navbar.Text className="text-white">
                {`Bienvenido, ${username || userRedux?.name || 'Usuario'}`}
              </Navbar.Text>
            </Nav>
          )}
          {/* Íconos de redes sociales */}
          <Nav className="ml-auto">
            <Nav.Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <i className="fab fa-facebook"></i>
            </Nav.Link>
            <Nav.Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <i className="fab fa-twitter"></i>
            </Nav.Link>
            <Nav.Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <i className="fab fa-instagram"></i>
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
