const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
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
app.use('/admin', adminRoutes);
app.use('/api/products', productRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server conectado en el puerto ${PORT}`));