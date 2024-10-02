import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

// Styled component para el campo de texto
const StyledField = styled(Field)`
  padding: 12px;
  width: 100%;
  border: 2px solid #4caf50; /* Borde verde */
  border-radius: 8px; /* Bordes más redondeados */
  margin-bottom: 10px;
  font-size: 16px; /* Tamaño de fuente más grande */
  transition: border 0.3s, box-shadow 0.3s; /* Transiciones suaves */

  &:focus {
    border: 2px solid #ff9800; /* Borde naranja al enfocarse */
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5); /* Sombra al enfocarse */
    outline: none; /* Sin contorno al enfocarse */
  }
`;

// Styled component para los mensajes de error
const ErrorText = styled.div`
  color: #f44336; /* Color rojo vibrante para el error */
  margin-bottom: 10px;
  font-weight: bold; /* Negrita para el texto de error */
`;

const TextInput = ({ name, placeholder, type = 'text' }) => (
  <div>
    <StyledField name={name} placeholder={placeholder} type={type} />
    <ErrorMessage name={name} component={ErrorText} />
  </div>
);

export default TextInput;
