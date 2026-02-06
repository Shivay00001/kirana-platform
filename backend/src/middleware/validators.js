const { body, validationResult } = require('express-validator');

exports.validateProduct = [
    body('name').trim().notEmpty().withMessage('Product name is required').escape(),
    body('price').isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock cannot be negative'),
    body('barcode').optional().trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

exports.validateSale = [
    body('items').isArray({ min: 1 }).withMessage('Sale must contain at least one item'),
    body('items.*.id').notEmpty().withMessage('Product ID is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('Price cannot be negative'),
    body('total').isFloat({ min: 0 }).withMessage('Total amount cannot be negative'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
