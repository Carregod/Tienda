import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext'; // Importa el proveedor del contexto
import Navbar from './components/Navbar'; // Asegúrate de que la ruta de Navbar sea correcta
import Login from './pages/Login'; // Componente de Login
import Register from './pages/Register'; // Componente de Registro
import Products from './pages/Products'; // Componente de Productos
import AddProduct from './pages/ProductForm'; // Asegúrate de que la ruta de ProductForm sea correcta
import StatsPage from './pages/StatsPage'; 
import Welcome from './pages/Welcome'; // Componente de Bienvenida
import Admin from './pages/AdminDashboard ';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  const PrivateRoute = ({ children }) => {
    
    const { isAuthenticated } = React.useContext(AuthContext); //contexto de autenticación
    return isAuthenticated ? children : <Navigate to="/login" />; // Redirigir si no está autenticado
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/products" /> : <Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={isAuthenticated ? <PrivateRoute ><Admin /> </PrivateRoute>: <Navigate to="/login" /> } />
          <Route path="/estadisticas" element={isAuthenticated ? <PrivateRoute ><StatsPage /> </PrivateRoute>: <Navigate to="/login" /> } />
          <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
          <Route path="/add-product" element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} />
          {/* Añade más rutas según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
