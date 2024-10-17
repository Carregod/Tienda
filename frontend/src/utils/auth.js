export const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', data.name); 
  } else {
    throw new Error(data.message);
  }
};

export const registerUser = async (name, email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.message);
  }
};

