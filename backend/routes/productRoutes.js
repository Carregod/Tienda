const express = require('express');
const router = express.Router();
const { addProduct, getProducts, buyProduct} = require('../controllers/productController');





router.get('/', getProducts);
router.post('/add', addProduct);
// router.delete('/:id', deleteProduct);
router.put('/buy/:id', buyProduct);


module.exports = router;
