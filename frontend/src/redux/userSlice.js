// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//   name: 'users',
//   initialState: {
//     user: null,
//     token: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//   },
// });

// export const { setUser, setToken } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false, // Nueva propiedad para manejar el estado de autenticación
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true; // Actualiza el estado cuando el usuario se establece
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false; // Restablece el estado de autenticación al cerrar sesión
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Actualiza los datos del usuario sin reemplazar completamente el objeto
    }
  },
});

// Exportar las acciones para usarlas en los componentes
export const { setUser, setToken, logout, updateUser } = userSlice.actions;

// Exportar el reducer
export default userSlice.reducer;

