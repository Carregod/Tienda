const mongoose = require('mongoose');

const purchasedProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('PurchasedProduct', purchasedProductSchema);
