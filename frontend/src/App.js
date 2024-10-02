
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Importa el proveedor del contexto
import Navbar from './components/Navbar'; // Asegúrate de que la ruta de Navbar sea correcta
import Login from './pages/Login'; // Componente de Login
import Register from './pages/Register'; // Componente de Registro
import Products from './components/Products'; // Componente de Productos
import AddProduct from './components/ProductForm'; // Asegúrate de que la ruta de ProductForm sea correcta
import Welcome from './components/Welcome'; // Componente de Bienvenida

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/products" /> : <Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
          <Route path="/add-product" element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} />
          {/* Añade más rutas según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Products from '../src/components/Products';
// import ProductForm from '../src/components/ProductForm';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Navbar from './components/Navbar';
// import Welcome from './components/Welcome';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };
//   return (
//     <Router>
//       <div>
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//         <Routes>
//         <Route path="/" element={isAuthenticated ? <Navigate to="/login" /> : <Welcome />} />
//           <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/add-product" element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
