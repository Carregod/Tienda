import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormContainer, H1, H3, ListItem, StyledButton } from '../styles/forms'; // Importa los componentes estilizados

const StatsPage = () => {
  const [productsBySales, setProductsBySales] = useState([]);
  const [productsByPrice, setProductsByPrice] = useState([]);
  const [productsByQuantity, setProductsByQuantity] = useState([]);
  const [availabilityStats, setAvailabilityStats] = useState({});
  const [revenueStats, setRevenueStats] = useState({});
  const [inventoryValue, setInventoryValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar la visibilidad de cada sección
  const [showSales, setShowSales] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [showEnabled, setShowEnabled] = useState(false);
  const [showDisabled, setShowDisabled] = useState(false);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [salesData, priceData, quantityData, availabilityData, revenueData, inventoryData] = await Promise.all([
          axios.get('http://localhost:5000/admin/products-by-sales'),
          axios.get('http://localhost:5000/admin/products-by-price'),
          axios.get('http://localhost:5000/admin/products-by-quantity'),
          axios.get('http://localhost:5000/admin/product-availability'),
          axios.get('http://localhost:5000/admin/revenue-stats'),
          axios.get('http://localhost:5000/admin/inventory-value'),
        ]);

        setProductsBySales(salesData.data);
        setProductsByPrice(priceData.data);
        setProductsByQuantity(quantityData.data);
        setAvailabilityStats(availabilityData.data);
        setRevenueStats(revenueData.data);
        setInventoryValue(inventoryData.data.totalValue);
      } catch (err) {
        setError('Error al obtener las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <FormContainer>
      <H1>Estadísticas</H1>

      {/* Productos Vendidos */}
      <section>
        <StyledButton onClick={() => setShowSales(!showSales)}>Productos Vendidos de Mayor a Menor</StyledButton>
        {showSales && (
          <FormContainer>
            <ul>
              {productsBySales.map((product) => (
                <ListItem key={product._id}>
                  {product.name}  {product.totalQuantitySold} unidades vendidas  ${product.totalRevenue} en ingresos
                </ListItem>
              ))}
            </ul>
          </FormContainer>
        )}
      </section>

      {/* Productos por Precio */}
      <section>
        <StyledButton onClick={() => setShowPrice(!showPrice)}>Productos por Precio de Mayor a Menor</StyledButton>
        {showPrice && (
          <FormContainer>
            <ul>
              {productsByPrice.map((product) => (
                <ListItem key={product._id}>
                  {product.name}  ${product.price}
                </ListItem>
              ))}
            </ul>
          </FormContainer>
        )}
      </section>

      {/* Productos por Cantidad */}
      <section>
        <StyledButton onClick={() => setShowQuantity(!showQuantity)}>Productos por Cantidad en Inventario de Mayor a Menor</StyledButton>
        {showQuantity && (
          <FormContainer>
            <ul>
              {productsByQuantity.map((product) => (
                <ListItem key={product._id}>
                  {product.name}  {product.quantity} en inventario
                </ListItem>
              ))}
            </ul>
          </FormContainer>
        )}
      </section>

   {/* Disponibilidad de Productos */}
<section>
  <StyledButton onClick={() => setShowAvailability(!showAvailability)}>
    Estadísticas de Disponibilidad de Productos
  </StyledButton>
  {showAvailability && (
    <FormContainer>
      <p>Total de productos: {availabilityStats.totalProducts}</p>

      {/* Botón para productos disponibles */}
      <StyledButton onClick={() => setShowAvailable(!showAvailable)}>
        Productos disponibles ({availabilityStats.availableProducts.length})
      </StyledButton>
      {showAvailable && (
        <ul>
          {availabilityStats.availableProducts.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}

      {/* Botón para productos no disponibles */}
      <StyledButton onClick={() => setShowUnavailable(!showUnavailable)}>
        Productos no disponibles ({availabilityStats.unavailableProducts.length})
      </StyledButton>
      {showUnavailable && (
        <ul>
          {availabilityStats.unavailableProducts.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}

      {/* Botón para productos habilitados */}
      <StyledButton onClick={() => setShowEnabled(!showEnabled)}>
        Productos habilitados ({availabilityStats.enabledProducts.length})
      </StyledButton>
      {showEnabled && (
        <ul>
          {availabilityStats.enabledProducts.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}

      {/* Botón para productos inhabilitados */}
      <StyledButton onClick={() => setShowDisabled(!showDisabled)}>
        Productos inhabilitados ({availabilityStats.disabledProducts.length})
      </StyledButton>
      {showDisabled && (
        <ul>
          {availabilityStats.disabledProducts.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}
    </FormContainer>
  )}
</section>


      {/* Ingresos Totales y Mensuales */}
      <section>
        <StyledButton onClick={() => setShowRevenue(!showRevenue)}>Estadísticas de Ingresos</StyledButton>
        {showRevenue && (
          <FormContainer>
            <p>Ingresos totales: ${revenueStats.totalRevenue}</p>
            <H3>Ingresos mensuales:</H3>
            <ul>
              {revenueStats.monthlyRevenue.map((month, index) => (
                <ListItem key={index}>
                  Mes {month._id}: ${month.totalRevenue}
                </ListItem>
              ))}
            </ul>
          </FormContainer>
        )}
      </section>

      {/* Valor del Inventario */}
      <section>
        <StyledButton onClick={() => setShowInventory(!showInventory)}>Valor Total del Inventario</StyledButton>
        {showInventory && (
          <FormContainer>
            <p>${inventoryValue}</p>
          </FormContainer>
        )}
      </section>
    </FormContainer>
  );
};

export default StatsPage;
