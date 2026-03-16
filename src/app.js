const express = require('express');
// يفتح الباب للطلبات الخارجية
// بيسمح ده بيعمل دومان بين الباك والفروند 
const cors = require('cors');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
 // للتأكد إن السيرفر شغال
app.get('/', (req, res) => {
    res.json({ message: 'SkyPass API is running!' });
});

// Routes
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;