const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/songs', songRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || "mongodb+srv://lanh1245:Lanh12345@spotify.h0a9e.mongodb.net/spotify",
).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on port ${process.env.PORT || 8080}`);
        console.log("http://localhost:8080/api/songs")
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});