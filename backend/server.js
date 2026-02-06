require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const productRoutes = require('./src/routes/products.routes');
const saleRoutes = require('./src/routes/sales.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers
app.use(helmet());

// Rate Limiting (Prevent DDoS/Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// CORS Config (Allow only specific origins in production)
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, 'http://localhost:5173'] // Add your production domains
        : '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Data Sanitization
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' })); // Limit body size

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'Kirana POS Backend' });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
