import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyledButton,
  FormContainer,
  StyledField,
  ListItem,
  H1,
  H2,
  H3,
} from "../styles/forms";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Cargar productos y usuarios al cargar el componente
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  // Obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      // const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Obtener usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  // Inhabilitar producto
  const handleDisable = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/disable/${id}`);
      fetchProducts();
      // Actualiza el estado local o vuelve a hacer fetch de los productos para ver los cambios.
    } catch (error) {
      console.error("Error al inhabilitar el producto:", error);
    }
  };

  // Habilitar producto
  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/activate/${id}`);
      fetchProducts();
      // Actualiza el estado local o vuelve a hacer fetch de los productos para ver los cambios.
    } catch (error) {
      console.error("Error al Habilitar el producto:", error);
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      fetchUsers(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Manejar cambios de productos
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/admin/products/${selectedProduct._id}`,
        selectedProduct
      );
      fetchProducts();
      setSelectedProduct(null); // Limpiar selección después de actualizar
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // Manejar cambios de usuarios
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/admin/users/${selectedUser._id}`,
        selectedUser
      );
      fetchUsers();
      setSelectedUser(null); // Limpiar selección después de actualizar
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  // Actualizar campos del producto
  const handleProductChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  // Actualizar campos del usuario
  const handleUserChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <H1>Admin Dashboard</H1>

      {/* Sección para gestionar productos */}
      <H2>Manage Products</H2>
      <ul>
        {products.map((product) => (
          <ListItem key={product._id}>
            {product.name} - ${product.price}
            <StyledButton onClick={() => setSelectedProduct(product)}>
              Edit
            </StyledButton>
            <StyledButton
              onClick={
                () =>
                  product.isInactive
                    ? handleActivate(product._id) // Si está inhabilitado, activar
                    : handleDisable(product._id) // Si está activo, deshabilitar
              }
            >
              {product.isInactive ? "Activar" : "Inhabilitar"}
            </StyledButton>
            <span>
              {product.name} - {product.isInactive ? "Inhabilitado" : "Activo"}
            </span>
          </ListItem>
        ))}
      </ul>

      {selectedProduct && (
        <FormContainer>
          <form onSubmit={handleEditProduct}>
            <H3>Edit Product</H3>
            <StyledField
              type="text"
              name="name"
              value={selectedProduct.name || ""}
              onChange={handleProductChange}
              placeholder="Product Name"
            />
            <StyledField
              type="text"
              name="price"
              value={selectedProduct.price || ""}
              onChange={handleProductChange}
              placeholder="Product Price"
            />
            <StyledField
              name="description"
              value={selectedProduct.description || ""}
              onChange={handleProductChange}
              placeholder="Product Description"
            />
            <StyledField
              type="number"
              name="quantity"
              value={selectedProduct.quantity || ""}
              onChange={handleProductChange}
              placeholder="Product Quantity"
            />
            <StyledField
              type="text"
              name="image"
              value={selectedProduct.image || ""}
              onChange={handleProductChange}
              placeholder="Product Image URL"
            />
            <StyledButton type="submit">Update Product</StyledButton>
          </form>
        </FormContainer>
      )}

      {/* Sección para gestionar usuarios */}
      <H2>Manage Users</H2>
      <ul>
        {users.map((user) => (
          <ListItem key={user._id}>
            {user.name} - {user.email}
            <StyledButton onClick={() => setSelectedUser(user)}>
              Edit
            </StyledButton>
            <StyledButton onClick={() => handleDeleteUser(user._id)}>
              Delete
            </StyledButton>
          </ListItem>
        ))}
      </ul>

      {selectedUser && (
        <FormContainer>
          <form onSubmit={handleEditUser}>
            <H3>Edit User</H3>
            <StyledField
              type="text"
              name="name"
              value={selectedUser.name || ""}
              onChange={handleUserChange}
              placeholder="User Name"
            />
            <StyledField
              type="email"
              name="email"
              value={selectedUser.email || ""}
              onChange={handleUserChange}
              placeholder="User Email"
            />
            <StyledButton type="submit">Update User</StyledButton>
          </form>
        </FormContainer>
      )}
    </FormContainer>
  );
};

export default AdminDashboard;
