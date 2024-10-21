import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInput from '../styles/TextInput';
import { StyledButton, FormContainer } from '../styles/forms'; 


const ProductForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    price: Yup.number().required('El precio es requerido'),
    quantity: Yup.number().required('La cantidad es requerido'),
    description: Yup.string(),
  });

  const addProduct = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/products/add', values);
      alert('Producto añadido exitosamente');
    } catch (error) {
      alert('Hubo un error al añadir el producto');
    }
  };

  return (
    <FormContainer>
      <h2 className="my-4 text-center">Añadir Producto</h2>
      <Formik
        initialValues={{ name: '', price: '', description: '',  quantity: '' }}
        validationSchema={validationSchema}
        onSubmit={addProduct}
      >
        {() => (
          <Form>
            <TextInput name="name" placeholder="Nombre del producto" />
            <TextInput name="price" placeholder="Precio" type="number" />
            <TextInput name="quantity" placeholder="Cantidad" type="number" />
            <TextInput name="description" placeholder="Descripción (opcional)" />
            <StyledButton type="submit">Añadir producto</StyledButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ProductForm;
