import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.7s ease-in-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledButton = styled.button`
   background-color: ${(props) => (props.danger ? '#ff4c4c' : '#007bff')};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? '#e63939' : '#0056b3')};
  }
  
  margin: 10px 5px;
`;

export const StyledField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #ff8a65;
  }
`;

export const ErrorMsg = styled.div`
  color: #ff5252;
  font-size: 0.9rem;
  margin-bottom: 10px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #333;
  color: #ddd;

  &:last-child {
    border-bottom: none;
  }
`;
export const H1 = styled.h1`
  font-size: 2.5rem;
  color: #b5d8d8; /* Blanco para destacar */
  margin: 20px 0;
  text-align: center;
`;

export const H2 = styled.h2`
  font-size: 2rem;
  color: #b5d8d8; /* Un azul brillante */
  margin: 15px 0;
  text-align: center;
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  color: #b5d8d8; /* Blanco */
  margin: 10px 0;
  text-align: left;
`;

