const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();
router.get('/dashboard', async (req, res) => {
    const users = await User.find( );
    res.render('adminDashboard', { users });
});
module.exports = router;
