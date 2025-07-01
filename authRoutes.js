const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./.vscode/client-management/models/User');
// Register
router.get('/', (req, res) => {
    res.render('register');
});
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });
    res.redirect('/login');
});
// Login
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.send('User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send('Incorrect password');
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect(user.isAdmin ? '/admin/dashboard' :
        '/client/dashboard');
});
// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
module.exports = router;
