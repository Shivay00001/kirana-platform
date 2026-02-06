const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { validateProduct } = require('../middleware/validators');

router.get('/', controller.getAllProducts);
router.get('/search', controller.searchProducts);
router.post('/', validateProduct, controller.createProduct);

module.exports = router;
