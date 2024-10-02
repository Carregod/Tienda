import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import TextInput from '../styles/TextInput'; 
import { StyledButton, FormContainer } from '../styles/forms'; 

const Register = () => {
  const navigate = useNavigate();  // Hook de navegación

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
  });

  const handleSubmit = async (values) => {
    const { name, email, password } = values;
    try {
      await registerUser(name, email, password);
      navigate('/login');  // Redirigir a la página de login después del registro
    } catch (error) {
      console.error('Error al registrar usuario', error);
    }
  };

  return (
    <FormContainer>
      <h2>Registrar Usuario</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <TextInput name="name" placeholder="Nombre" />
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" placeholder="Contraseña" type="password" />
            <StyledButton type="submit">Registrar</StyledButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Register;
