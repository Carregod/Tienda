const express = require('express');
const router = express.Router();
const { addProduct, getProducts, buyProduct, purchaseProducts, updateProduct } = require('../controllers/productController');






router.get('/', getProducts);
router.post('/add', addProduct);
// router.delete('/:id', deleteProduct);
router.put('/buy/:id', buyProduct);
router.post('/purchase', purchaseProducts);
router.put('/:id', updateProduct);

module.exports = router;
