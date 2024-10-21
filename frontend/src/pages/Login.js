import React, {  useContext,  useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextInput from '../styles/TextInput';
import { StyledButton, FormContainer } from '../styles/forms';
import { AuthContext } from '../components/AuthContext'; // Importamos el contexto
import { loginUser } from '../utils/auth'; // Importa la función de inicio de sesión

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // Obtenemos la función para actualizar el estado

  useEffect(() => {
    localStorage.clear();
    console.log('LocalStorage ha sido limpiado al cargar la página /login');
  }, []); 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
  });

  const handleSubmit = async (values) => {
    try {
      // Llama a la función de inicio de sesión
      await loginUser(values.email, values.password);
      // Actualiza el estado de autenticación
      setIsAuthenticated(true);
      // Llama a la función onLogin si está presente
      onLogin();
      // Redirige a productos
      navigate('/products');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <FormContainer>
      <h2>Iniciar sesión</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" placeholder="Contraseña" type="password" />
            <StyledButton type="submit">Iniciar sesión</StyledButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Login;
