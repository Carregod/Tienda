const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const authMiddleware = require('./utils/authMiddleware');
require('dotenv').config()


const app = express();
mongoose.connect(process.env.DB_URI, )
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.error('Error al conectar a la base de datos', err));

app.use(cors());
app.use(express.json());

// Rutas

app.get('/', (req, res) => {res.send('¡Bienvenido! Por favor, inicie sesión.');});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server conectado en el puerto ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// // const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// app.use(express.json());
// // app.use(cors());

// // Conectar a MongoDB
// mongoose.connect('mongodb+srv://carregod98:Delich98@carregod.5s7xr.mongodb.net/misDatos?retryWrites=true&w=majority&appName=carregod', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch((error) => console.error('Error conectando a MongoDB:', error));

// // Rutas
// app.use('/api/auth', authRoutes);

// // Iniciar servidor
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });