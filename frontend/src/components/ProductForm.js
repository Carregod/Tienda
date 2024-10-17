// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';


// const ProductForm = () => {
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('El nombre es requerido'),
//     price: Yup.number().required('El precio es requerido'),
//     description: Yup.string(),
//   });

//   const addProduct = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/products/add', values);
//       console.log('Producto añadido:', response.data);
//       alert('Producto añadido exitosamente');
//     } catch (error) {
//       console.error('Error al añadir producto:', error);
//       alert('Hubo un error al añadir el producto');
//     }
//   };

//   return (
//     <Formik
//       initialValues={{ name: '', price: '', description: '' }}
//       validationSchema={validationSchema}
//       onSubmit={addProduct}
//     >
//       {() => (
//         <Form>
//           <Field name="name" placeholder="Nombre del producto" />
//           <ErrorMessage name="name" component="div" />
//           <Field name="price" placeholder="Precio" type="number" />
//           <ErrorMessage name="price" component="div" />
//           <Field name="description" placeholder="Descripción del producto (opcional)" />
//           <ErrorMessage name="description" component="div" />
//           <button type="submit">Añadir producto</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ProductForm;


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
