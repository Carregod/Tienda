import React, { useEffect } from 'react';
import '../styles/Welcome.css'; 

const Welcome = () => {
  
  useEffect(() => {
    // Limpiar el localStorage cuando el componente se monte (cuando se acceda a "/")
    localStorage.clear();
    console.log('LocalStorage ha sido limpiado al cargar la página /');
  }, []); // El array vacío asegura que esto solo ocurra una vez al montar el componente

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>¡Bienvenido a Nuestra Tienda!</h1>
        <p>Por favor, inicie sesión para disfrutar de nuestras ofertas exclusivas.</p>
      </div>
    </div>
  );
};

export default Welcome;

