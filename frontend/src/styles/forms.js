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
  background: linear-gradient(135deg, #ff5722, #ff8a65);
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.4s ease, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, #e64a19, #ff7043);
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
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
