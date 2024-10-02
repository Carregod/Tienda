// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// function TextLinkExample() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // Verifica si hay un token en localStorage cuando la aplicación se carga
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   // Función para manejar el cierre de sesión
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     navigate('/login'); // Redirige a la página de login
//   };

//   return (
//     <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             {/* Mostrar "Login" y "Register" solo si no está autenticado */}
//             {!isAuthenticated && (
//               <>
//                 <Nav.Link as={Link} to="/login" className="text-white">Acceder</Nav.Link>
//                 <Nav.Link as={Link} to="/register" className="text-white">Registrar</Nav.Link>
//               </>
//             )}

//             {/* Mostrar "Productos" y "Añadir Productos" solo si está autenticado */}
//             {isAuthenticated && (
//               <>
//                 <Nav.Link as={Link} to="/products" className="text-white">Productos</Nav.Link>
//                 <Nav.Link as={Link} to="/add-product" className="text-white">Añadir Productos</Nav.Link>
//               </>
//             )}

//             {/* Mostrar "Cerrar Sesión" solo si está autenticado */}
//             {isAuthenticated && (
//               <Nav.Link onClick={handleLogout} className="text-white">Cerrar Sesión</Nav.Link>
//             )}
//           </Nav>

//           {/* Sección de íconos de redes sociales */}
         
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default TextLinkExample;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthContext } from './AuthContext'; // Importamos el contexto

function TextLinkExample() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Usamos el contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
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
              <>
                <Nav.Link as={Link} to="/products" className="text-white">Productos</Nav.Link>
                <Nav.Link as={Link} to="/add-product" className="text-white">Añadir Productos</Nav.Link>
              </>
            )}

            {/* Mostrar "Cerrar Sesión" solo si está autenticado */}
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout} className="text-white">Cerrar Sesión</Nav.Link>
            )}
          </Nav>
          </Navbar.Collapse>
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
