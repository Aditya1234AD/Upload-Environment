const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const authRoutes = require('./authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
// DB connection
mongoose.connect('mongodb://localhost:27017/userUploads');
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secretKey123',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:
            'mongodb://localhost:27017/userUploads'
    })
}));
app.set('view engine', 'ejs');
// Routes
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/admin', adminRoutes);
app.use('uploads',
    express.static('uploades'));
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
