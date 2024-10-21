const express = require("express");
const router = express.Router();
const {
  addProduct,
  buyProduct,
  purchaseProducts,
  updateProduct,
  getActiveProducts
} = require("../controllers/productController");


router.get("/", getActiveProducts);
router.post("/add", addProduct);
router.put("/buy/:id", buyProduct);
router.post("/purchase", purchaseProducts);
router.put("/:id", updateProduct);

module.exports = router;
