const express = require('express');
const multer = require('multer');
const path = require('path');
const { isAuthenticated } = require('../middleware/authMiddleware');
const User = require('./models/User');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() +
        path.extname(file.originalname))
});
const upload = multer({ storage });
// Client dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.render('clientDashboard', { user });
});
// Upload photo and details
router.post('/upload', isAuthenticated, upload.single('photo'), async(req, res) => {
    const { name: fullName, village, district } = req.body;
    const photo = req.file.filename;
    await User.findByIdAndUpdate(req.session.userId, {
        photo,
        details: { name: fullName, village, district }
});
    res.redirect('/client/dashboard');
});
module.exports = router;
