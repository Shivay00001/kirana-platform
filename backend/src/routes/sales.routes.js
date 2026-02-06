const express = require('express');
const router = express.Router();
const controller = require('../controllers/saleController');
const { validateSale } = require('../middleware/validators');

router.post('/', validateSale, controller.createSale);

module.exports = router;
