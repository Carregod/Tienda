const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }, 
  image: { type: String, require: true}
});

module.exports = mongoose.model('Product', productSchema);

