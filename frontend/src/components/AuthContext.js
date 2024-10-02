import { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
